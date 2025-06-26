import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/request/create-user-request.dto'
import { User } from './model/user.schema'
import { hashPassword } from 'src/utils/utils'
import { PatientService } from 'src/patient/patient.service'
import { USER_ROLES } from './enums/user-role.enum'
import { CreatePatientDto } from 'src/patient/dto/request/create-patient-request.dto'
import { EmailService } from 'src/email/email.service'
import { UserDetailsResponseDto } from './dto/response/user-details-response.dto'
import { UserResumenResponseDto } from './dto/response/user-resumen-response.dto'
import { mapUserDetailsToDto } from './mapper/user-details-response.mapper'
import { mapUserResumenToDto } from './mapper/user-resumen-response.mapper'
import { mapPatientToDto } from 'src/patient/mapper/patient-response.mapper'
import { IUser } from './interfaces/user.interface'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly patientService: PatientService,
    private readonly emailService: EmailService
  ) {}

  // create
  async create(createUserDto: CreateUserDto): Promise<UserDetailsResponseDto> {
    const hashedPassword = await hashPassword(createUserDto.password)
    createUserDto.password = hashedPassword

    const user = await this.userModel.create(createUserDto)

    let patientDetails = undefined
    if (createUserDto.role === 'patient' && createUserDto.patientDetails) {
      const createPatientDto: CreatePatientDto & { userId: string } = {
        ...createUserDto.patientDetails,
        userId: user._id.toString()
      }
      await this.patientService.create(createPatientDto)
      const patient = await this.patientService.findByUserId(user._id.toString())
      patientDetails = mapPatientToDto(patient)
    }

    // Enviar correo de bienvenida
    await this.emailService.sendEmailWelcome(user._id.toString())

    return mapUserDetailsToDto({
      email: user.email,
      role: user.role,
      patientDetails
    })
  }

  // findOneById
  async findById(id: string): Promise<UserDetailsResponseDto> {
    const user = await this.userModel.findById(id).select('-_id -password').lean()
    if (!user) return null

    let patientDetails = undefined
    if (user.role === 'patient') {
      const patient = await this.patientService.findByUserId(id)
      if (patient) {
        patientDetails = mapPatientToDto(patient)
      }
    }

    return mapUserDetailsToDto({
      email: user.email,
      role: user.role,
      patientDetails
    })
  }

  // Para lógica interna (auth, etc.)
  async findByEmailRaw(email: string): Promise<IUser> {
    return this.userModel.findOne({ email })
  }

  // Para exponer en la API
  async findByEmailDto(email: string): Promise<UserDetailsResponseDto> {
    const user = await this.userModel.findOne({ email }).select('-password').lean()
    if (!user) return null

    let patientDetails = undefined
    if (user.role === USER_ROLES[2]) { // patient
      const patient = await this.patientService.findByUserId(user._id.toString())
      if (patient) {
        patientDetails = mapPatientToDto(patient)
      }
    }

    return mapUserDetailsToDto({
      email: user.email,
      role: user.role,
      patientDetails
    })
  }

  // findAll
  async findAll(): Promise<UserResumenResponseDto[]> {
    const users = await this.userModel.find().select('-_id -password').lean()
    return users.map(mapUserResumenToDto)
  }

  // delete
  async delete(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(id)

    switch (user.role) {
      // case USER_ROLES[0]: // *doctor
      //   await this.doctorService.deleteByUserId(user._id);
      //   break;
      // case USER_ROLES[1]: // *nurse
      //   await this.nurseService.deleteByUserId(user._id);
      //   break;
      case USER_ROLES[2]: // patient
        await this.patientService.delete(user._id.toString())
        break
    }

    await this.userModel.findByIdAndDelete(id).select('-_id -password').lean()
  }

  // updatePassword
  async updatePassword(id: string, password: string): Promise<UserResumenResponseDto> {
    const hashedPassword = await hashPassword(password)
    const user = await this.userModel.findByIdAndUpdate(id, { password: hashedPassword }).select('-_id -password').lean()
    return mapUserResumenToDto(user)
  }

  // countUsersByRole
}

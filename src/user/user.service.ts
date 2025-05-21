import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './model/user.schema'
import { hashPassword } from 'src/utils/utils'
import { IUser } from './interfaces/user.interface'
import { PatientService } from 'src/patient/patient.service'
import { USER_ROLES } from './enums/user-role.enum'
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto'
import { EmailService } from 'src/email/email.service'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly patientService: PatientService,
    private readonly emailService: EmailService
  ) {}

  // create
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hashPassword(createUserDto.password)

    createUserDto.password = hashedPassword

    const user = await this.userModel.create(createUserDto)

    if (createUserDto.role === 'patient' && createUserDto.patientDetails) {
      const createPatientDto: CreatePatientDto & { userId: string } = {
        ...createUserDto.patientDetails,
        userId: user._id.toString()
      }

      await this.patientService.create(createPatientDto)
    }

    // *Doctor
    // if (createUserDto.role === 'patient' && createUserDto.patientDetails) {
    //   const createPatientDto: CreatePatientDto & { userId: string } = {
    //     ...createUserDto.patientDetails,
    //     userId: user._id.toString(),
    //   };

    //   await this.patientService.create(createPatientDto);
    // }

    // *Nurse
    // if (createUserDto.role === 'patient' && createUserDto.patientDetails) {
    //   const createPatientDto: CreatePatientDto & { userId: string } = {
    //     ...createUserDto.patientDetails,
    //     userId: user._id.toString(),
    //   };

    //   await this.patientService.create(createPatientDto);
    // }

    // Enviar correo de bienvenida
    await this.emailService.sendEmailWelcome(user._id.toString())

    return user
  }

  // findOneById
  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).select('-_id -password').lean()
  }

  // findByEmail
  async findByEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ email })
  }

  // findAll
  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-_id -password').lean()
  }

  // delete
  async delete(id: string): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id)

    // export const USER_ROLES = ['doctor', 'nurse', 'patient'] as const;
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

    const deletedUser = await this.userModel.findByIdAndDelete(id).select('-_id -password').lean()

    return deletedUser
  }

  // updatePassword
  async updatePassword(id: string, password: string): Promise<User> {
    const hashedPassword = await hashPassword(password)
    return this.userModel.findByIdAndUpdate(id, { password: hashedPassword }).select('-_id -password').lean()
  }

  // changeUserRole
  // countUsersByRole
}

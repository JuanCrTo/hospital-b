import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Patient } from './model/patient.schema'
import { Model } from 'mongoose'
import { CreatePatientDto } from './dto/create-patient.dto'
import { UpdatePatientDto } from './dto/update-user.dto'
import { addLocationToHistory, calculateAge, calculateClinicalAge, getCoordinatesFromLocation } from 'src/utils/utils'

@Injectable()
export class PatientService {
  constructor(@InjectModel(Patient.name) private readonly patientModel: Model<Patient>) {}

  // create
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const age = calculateAge(createPatientDto.birth)
    const clinicalage = calculateClinicalAge(createPatientDto.birth)

    const patientWithCalculatedData = {
      ...createPatientDto,
      age,
      clinicalage
    }

    const { location } = createPatientDto
    if (location) {
      const { latitude, longitude } = await getCoordinatesFromLocation(location)
      patientWithCalculatedData.latitude = latitude
      patientWithCalculatedData.longitude = longitude
    }

    return this.patientModel.create(patientWithCalculatedData)
  }

  // update
  async update(id: string, patient: UpdatePatientDto): Promise<Patient> {
    const updateData: any = { ...patient }

    if (updateData.birth) {
      updateData.age = calculateAge(updateData.birth)
      updateData.clinicalage = calculateClinicalAge(updateData.birth)
    }

    const { location } = updateData
    if (location) {
      const { latitude, longitude } = await getCoordinatesFromLocation(location)
      updateData.latitude = latitude
      updateData.longitude = longitude

      const existingPatient = await this.patientModel.findById(id)
      updateData.locationHistory = addLocationToHistory(existingPatient?.locationHistory || [], { location, latitude, longitude })
    }

    return this.patientModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
        lean: true
      })
      .select('-_id')
      .lean()
  }

  // delete
  async delete(userId: string): Promise<void> {
    await this.patientModel.deleteOne({ userId })
  }

  // findAll
  async findAll(): Promise<Patient[]> {
    return this.patientModel.find().select('-_id').lean()
  }

  // findById
  async findById(id: string): Promise<Patient> {
    return this.patientModel.findById(id).select('-_id').lean()
  }

  // findByIdentification
  async findByIdentification(identification: string): Promise<Patient> {
    return this.patientModel.findOne({ identification }).select('-_id').lean()
  }

  // findByAge
  async findByAge(age: number): Promise<Patient[]> {
    return this.patientModel.find({ age }).select('-_id').lean()
  }

  // findByFirstname
  async findByFirstname(firstname: string): Promise<Patient[]> {
    return this.patientModel.find({ firstname }).select('-_id').lean()
  }

  // findByLastname
  async findByLastname(lastname: string): Promise<Patient[]> {
    return this.patientModel.find({ lastname }).select('-_id').lean()
  }

  // getUserByPatientId
}

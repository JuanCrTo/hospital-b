import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import * as FormData from 'form-data'
import { first, lastValueFrom } from 'rxjs'
import { User } from 'src/user/model/user.schema'
import { Patient } from 'src/patient/model/patient.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class EmailService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Patient.name) private readonly patientModel: Model<Patient>
  ) {}

  async sendEmailForgotPassword(userId: string, resetLink: string) {
    const user = await this.userModel.findById(userId).lean()

    const email = user.email

    const variables = {
      resetLink
    }

    const formData = new FormData()
    formData.append('from', 'HospitalYellow <hospitalyellow@gmail.com>')
    formData.append('to', email)
    formData.append('subject', 'Password Reset')
    formData.append('template', 'forgot-password')
    formData.append('h:X-Mailgun-Variables', JSON.stringify(variables))

    const url = `${this.configService.get<string>('MAILGUN_URL_AND_DOMAIN')}`

    const auth = {
      username: 'api',
      password: this.configService.get<string>('MAILGUN_API_KEY')
    }

    const response = await lastValueFrom(
      this.httpService.post(url, formData, {
        auth,
        headers: formData.getHeaders()
      })
    )

    return response.data
  }

  async sendEmailWelcome(userId: string): Promise<any> {
    const user = await this.userModel.findById(userId).lean()

    if (!user) {
      throw new Error('User not found')
    }

    const email = user.email
    const tipo = user.role

    let name: string

    switch (tipo) {
      // case 'doctor':
      //   const doctor = await this.doctorModel.findOne({ userId }).lean()
      //   name = doctor?.firstname || 'Doctor'
      //   break

      case 'patient':
        const patient = await this.patientModel.findOne({ userId }).lean()
        name = patient?.firstname || 'Paciente'
        break

      // case 'nurse':
      //   const nurse = await this.nurseModel.findOne({ userId }).lean()
      //   name = nurse?.firstname || 'Enfermero/a'
      //   break

      default:
        name = 'Usuario'
    }

    const variables = {
      firstname: name
    }

    const formData = new FormData()
    formData.append('from', 'HospitalYellow <hospitalyellow@gmail.com>')
    formData.append('to', email)
    formData.append('subject', 'Welcome to Hospital Yellow')
    formData.append('template', 'welcome')
    formData.append('h:X-Mailgun-Variables', JSON.stringify(variables))

    const url = `${this.configService.get<string>('MAILGUN_URL_AND_DOMAIN')}`

    const auth = {
      username: 'api',
      password: this.configService.get<string>('MAILGUN_API_KEY')
    }

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, formData, {
          auth,
          headers: formData.getHeaders()
        })
      )
      return response.data
    } catch (error) {
      console.error('Error al enviar el correo', error)
      throw new Error('Error al enviar el correo')
    }
  }
}

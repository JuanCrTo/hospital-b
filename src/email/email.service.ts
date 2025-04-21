import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import * as FormData from 'form-data'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class EmailService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async forgotpassword(email: string, nombre: string, resetLink: string) {
    const formData = new FormData()
    formData.append('from', 'HospitalApp <no-reply@tu-dominio.com>')
    formData.append('to', email)
    formData.append('subject', 'Restablecer contraseña')
    formData.append('template', 'forgotpassword')

    const variables = {
      nombre,
      resetLink
    }

    formData.append('h:X-Mailgun-Variables', JSON.stringify(variables))

    const url = `${this.configService.get<string>('MAILGUN_URL_AND_DOMAIN')}`;

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

  async sendEmail(to: string, nombre: string): Promise<any> {
    const formData = new FormData();
    formData.append('from', 'HospitalApp <no-reply@tu-dominio.com>');
    formData.append('to', to);
    formData.append('subject', 'Test Subject');
    formData.append('text', `Hola ${nombre}, este es un correo de prueba`);
  
    const url = `${this.configService.get<string>('MAILGUN_URL_AND_DOMAIN')}`;
    
    const auth = {
      username: 'api',
      password: this.configService.get<string>('MAILGUN_API_KEY')
    };
  
    try {
      const response = await lastValueFrom(
        this.httpService.post(url, formData, {
          auth,
          headers: formData.getHeaders()
        })
      );
      return response.data;
    } catch (error) {
      console.error('Error al enviar el correo', error);
      throw new Error('Error al enviar el correo');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class EmailService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendPasswordEmail(user: { email: string; name: string }, token: string, reset = false) {
    const link = `${this.configService.get<string>('CLIENT_URL')}/session/${reset ? 'set_password' : 'reset_password'}?token=${token}`;

    const variables = {
      nombre: user.name,
      resetLink: link,
    };

    const formData = new FormData();
    formData.append('from', 'HospitalApp <no-reply@tu-dominio.com>');
    formData.append('to', user.email);
    formData.append('subject', reset ? 'Restablecer contraseña' : 'Configurar contraseña');
    formData.append('template', reset ? 'template-reset-pass' : 'template-set-pass'); // esto debe coincidir con tus templates creados en Mailgun
    formData.append('h:X-Mailgun-Variables', JSON.stringify(variables));

    return await lastValueFrom(this.httpService.post('messages', formData));
  }
}
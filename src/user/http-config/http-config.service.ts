import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: this.configService.get<string>('MAILGUN_URL'),
      auth: {
        username: 'api',
        password: this.configService.get<string>('MAILGUN_API_KEY'),
      },
    };
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { EmailData, ForgotPasswordEmailData, WelcomeEmailData } from './interfaces/email.interface';
import * as mailgun from 'mailgun-js';

@Injectable()
export class EmailConsumer implements OnModuleInit {
  private mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async onModuleInit() {
    await this.startConsumingForgotPassword();
    await this.startConsumingWelcome();
  }

  private async startConsumingForgotPassword() {
    console.log('Starting to consume forgot password emails...');
    
    await this.rabbitMQService.consume(RabbitMQService.QUEUES.FORGOT_PASSWORD, async (msg) => {
      if (!msg) return;

      try {
        const emailData: ForgotPasswordEmailData = JSON.parse(msg.content.toString());
        
        console.log('Processing forgot password email:', emailData);
        
        // Validación específica para forgot-password
        if (!emailData.to || !emailData.subject || !emailData.resetLink) {
          throw new Error('Missing required fields for forgot-password email');
        }

        const mailOptions = {
          from: 'HospitalYellow <hospitalyellow@gmail.com>',
          to: emailData.to,
          subject: emailData.subject,
          template: 'forgot-password',
          'h:X-Mailgun-Variables': JSON.stringify({
            resetLink: emailData.resetLink
          })
        };

        await this.mg.messages().send(mailOptions);
        this.rabbitMQService.channel.ack(msg);
        
        console.log(`Forgot password email sent to ${emailData.to}`);
      } catch (error) {
        console.error('Error processing forgot password email:', error.message);
        this.rabbitMQService.channel.nack(msg, false, false); // No requeue en caso de error
      }
    });
  }

  private async startConsumingWelcome() {
    console.log('Starting to consume welcome emails...');
    
    await this.rabbitMQService.consume(RabbitMQService.QUEUES.WELCOME, async (msg) => {
      if (!msg) return;

      try {
        const emailData: WelcomeEmailData = JSON.parse(msg.content.toString());
        
        console.log('Processing welcome email:', emailData);
        
        // Validación específica para welcome
        if (!emailData.to || !emailData.subject || !emailData.firstname) {
          throw new Error('Missing required fields for welcome email');
        }

        const mailOptions = {
          from: 'HospitalYellow <hospitalyellow@gmail.com>',
          to: emailData.to,
          subject: emailData.subject,
          template: 'welcome',
          'h:X-Mailgun-Variables': JSON.stringify({
            firstname: emailData.firstname
          })
        };

        await this.mg.messages().send(mailOptions);
        this.rabbitMQService.channel.ack(msg);
        
        console.log(`Welcome email sent to ${emailData.to}`);
      } catch (error) {
        console.error('Error processing welcome email:', error.message);
        this.rabbitMQService.channel.nack(msg, false, false); // No requeue en caso de error
      }
    });
  }
}
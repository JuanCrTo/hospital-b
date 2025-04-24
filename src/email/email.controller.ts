import { Controller, Get, Query } from '@nestjs/common'
import { EmailService } from './email.service'
import { Public } from 'src/decorators/public.decorator'

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('forgotpassword')
  async forgotpassword(@Query('to') to: string, @Query('nombre') nombre: string) {
    const resetLink = `https://localhost:3000/set-password?token=fake-token`
    return await this.emailService.forgotpassword(to, nombre, resetLink)
  }

  @Public()
  @Get('welcome')
  async sendEmailWelcome(@Query('userId') userId: string) {
    try {
      const result = await this.emailService.sendEmailWelcome(userId)
      return { message: 'Correo enviado con éxito', result }
    } catch (error) {
      return { message: 'Error al enviar el correo', error: error.message }
    }
  }
}

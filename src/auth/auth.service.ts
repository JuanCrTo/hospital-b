import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { EmailService } from 'src/email/email.service'
import { IUser } from 'src/user/interfaces/user.interface'
import { comparePassword } from 'src/utils/utils'
import { UserService } from '../user/user.service'
import { SignInResponseDto } from './dto/response/signIn-auth-response.dto'
import { IJwtPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) {}

  async signIn(email: string, password: string): Promise<SignInResponseDto> {
    const user = await this.userService.findByEmail(email)
    if (!user) throw new UnauthorizedException()

    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) throw new UnauthorizedException()

    const payload: IJwtPayload = { userId: user._id.toString() }
    const access_token = await this.jwtService.signAsync(payload)

    return { access_token }
  }

  async generateResetTokenJWT(user: IUser): Promise<string> {
    const payload: IJwtPayload = { userId: user._id }
    return this.jwtService.signAsync(payload)
  }

  // Verify if the email is exist in the database (User Service findByEmail), generate a token (Auth Service generateResetTokenJWT), create a unique link with the token and send the email to the user (Email Service forgotpassword)
  async handleForgotPassword(email: string) {
    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw new NotFoundException('Usuario no encontrado')
    }

    const token = await this.generateResetTokenJWT(user)
    const baseUrl = this.configService.get<string>('LOCAL_URL')
    const resetLink = `${baseUrl}/reset-password?token=${token}`

    return this.emailService.sendEmailForgotPassword(user._id, resetLink)
  }
}

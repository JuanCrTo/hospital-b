import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './model/user.schema'
import { Public } from '../decorators/public.decorator'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email)
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id)
  }

  @ApiBearerAuth('JWT-auth')
  @Put(':id/password')
  async updatePassword(@Param('id') id: string, @Body('password') password: string) {
    return this.userService.updatePassword(id, password)
  }
}

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './model/user.schema'
import { Public } from '../decorators/public.decorator'
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @Public()
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('email/:email')
  @ApiOperation({ summary: 'Get user by email' })
  async findUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email)
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  async deleteById(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id)
  }

  @ApiBearerAuth('JWT-auth')
  @Put(':id/password')
  @ApiOperation({ summary: 'Update user password' })
  async updatePassword(@Param('id') id: string, @Body('password') password: string) {
    return this.userService.updatePassword(id, password)
  }
}

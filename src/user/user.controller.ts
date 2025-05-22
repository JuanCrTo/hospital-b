import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './model/user.schema'
import { Public } from '../decorators/public.decorator'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created successfully', type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK', type: CreateUserDto })
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('email/:email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK', type: CreateUserDto })
  async findUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email)
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'OK', type: [CreateUserDto] })
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User deleted successfully' })
  async deleteById(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id)
  }

  @ApiBearerAuth('JWT-auth')
  @Put(':id/password')
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Password updated successfully', type: CreateUserDto })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Password updated successfully', type: CreateUserDto })
  async updatePassword(@Param('id') id: string, @Body('password') password: string) {
    return this.userService.updatePassword(id, password)
  }
}

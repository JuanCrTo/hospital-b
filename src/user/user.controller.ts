import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/request/create-user-request.dto'
import { User } from './model/user.schema'
import { Public } from '../decorators/request/public.decorator'
import { ApiBearerAuth, ApiBody, ApiNoContentResponse, ApiOperation } from '@nestjs/swagger'
import { changePasswordResponseDto } from './dto/response/changePassword-user-response.dto'
import { ApiStandardResponse } from 'src/decorators/swagger/response.decorator'
import { ApiStandardError } from 'src/decorators/swagger/error.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiStandardResponse(CreateUserDto)
  @ApiStandardError()
  @ApiBody({ description: 'User data', type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiStandardResponse(CreateUserDto)
  @ApiStandardError()
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('email/:email')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user by email' })
  @ApiStandardResponse(CreateUserDto)
  @ApiStandardError()
  async findUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email)
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all users' })
  @ApiStandardResponse(CreateUserDto)
  @ApiStandardError()
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @Put(':id/password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update user password' })
  @ApiStandardResponse(CreateUserDto)
  @ApiStandardError()
  @ApiBody({ description: 'New password', type: changePasswordResponseDto })
  async updatePassword(@Param('id') id: string, @Body('password') password: string) {
    return this.userService.updatePassword(id, password)
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiStandardResponse(CreateUserDto)
  @ApiStandardError()
  async deleteById(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id)
  }
}

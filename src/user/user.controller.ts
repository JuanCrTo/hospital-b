import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/request/create-user-request.dto'
import { User } from './model/user.schema'
import { Public } from '../decorators/request/public.decorator'
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { changePasswordResponseDto } from './dto/response/changePassword-user-response.dto'
import { ApiAuthResponses } from 'src/decorators/auth/apiAuthResponse.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: CreateUserDto
  })
  @ApiBadRequestResponse({ description: 'Missing or invalid credentials' })
  @ApiBody({ description: 'User data', type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiOkResponse({
    description: 'OK',
    type: CreateUserDto
  })
  @ApiAuthResponses()
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('email/:email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiOkResponse({
    description: 'OK',
    type: CreateUserDto
  })
  @ApiAuthResponses()
  async findUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email)
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'OK',
    type: [CreateUserDto]
  })
  @ApiAuthResponses()
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiAuthResponses()
  async deleteById(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id)
  }

  @ApiBearerAuth('JWT-auth')
  @Put(':id/password')
  @ApiOperation({ summary: 'Update user password' })
  @ApiNoContentResponse({
    description: 'Password updated successfully',
    type: CreateUserDto
  })
  @ApiAuthResponses()
  @ApiBody({ description: 'New password', type: changePasswordResponseDto })
  async updatePassword(@Param('id') id: string, @Body('password') password: string) {
    return this.userService.updatePassword(id, password)
  }
}

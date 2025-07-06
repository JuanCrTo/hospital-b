import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, NotFoundException } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/request/create-user-request.dto'
import { User } from './model/user.schema'
import { Public } from '../decorators/request/public.decorator'
import { ApiBearerAuth, ApiBody, ApiNoContentResponse, ApiOperation } from '@nestjs/swagger'
import { changePasswordResponseDto } from './dto/response/changePassword-user-response.dto'
import { ApiStandardResponse } from 'src/decorators/swagger/response.decorator'
import { ApiStandardError } from 'src/decorators/swagger/error.decorator'
import { UserDetailsResponseDto } from './dto/response/user-details-response.dto'
import { UserResumenResponseDto } from './dto/response/user-resumen-response.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiStandardResponse(UserDetailsResponseDto, 201)
  @ApiStandardError()
  @ApiBody({ description: 'User data', type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDetailsResponseDto> {
    return this.userService.create(createUserDto)
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiStandardResponse(UserDetailsResponseDto, 200)
  @ApiStandardError()
  async findUserById(@Param('id') id: string): Promise<UserDetailsResponseDto> {
    return this.userService.findById(id)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('email/:email')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user by email' })
  @ApiStandardResponse(UserDetailsResponseDto, 200)
  @ApiStandardError()
  async findUserByEmail(@Param('email') email: string): Promise<UserDetailsResponseDto> {
    const user = await this.userService.findByEmailDto(email)
    if (!user) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado`)
    }
    return user
  }

  @ApiBearerAuth('JWT-auth')
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all users' })
  @ApiStandardResponse(UserResumenResponseDto, 200)
  @ApiStandardError()
  async findAll(): Promise<UserResumenResponseDto[]> {
    return this.userService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @Put(':id/password')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update user password' })
  @ApiStandardResponse(UserResumenResponseDto, 200)
  @ApiStandardError()
  @ApiBody({ description: 'New password', type: changePasswordResponseDto })
  async updatePassword(@Param('id') id: string, @Body('password') password: string): Promise<UserResumenResponseDto> {
    return this.userService.updatePassword(id, password)
  }

  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiStandardResponse(null, 204)
  @ApiStandardError()
  async deleteById(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id)
  }
}

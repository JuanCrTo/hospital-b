import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './model/user.schema'
import { UpdateUserDto } from './dto/update-user.dto'
import { Public } from '../decorators/public.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user
  @Public()
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto)
  }

  // Find one user by ID
  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id)
  }

  // Find one user by email
  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email)
  }

  // Find all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  // Delete a user by ID
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id)
  }

  // Update a user's password by ID
  @Public()
  @Put(':id/password')
  async updatePassword(@Param('id') id: string, @Body('password') password: string) {
    return this.userService.updatePassword(id, password)
  }
}

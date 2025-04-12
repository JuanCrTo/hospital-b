import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // create
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  // findOne
  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).lean();
  }

  // findById
  // findByEmail
  // findAll

  // update
  // delete

  // updatePassword
  // forgotPassword

  // changeUserRole
  // countUsersByRole
}

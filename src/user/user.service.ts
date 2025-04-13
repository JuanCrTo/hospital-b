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

  // findOneById
  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).lean();
  }

  // findByEmail
  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).lean();
  }

  // findAll
  async findAll(createUserDto: CreateUserDto): Promise<User[]> {
    return this.userModel.find(createUserDto).select('-password').lean();
  }

  // update
  async update(id: string, user: UpdateUserDto): Promise<void> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
      lean: true,
    });
  }

  // delete
  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).lean();
  }

  // updatePassword
  // forgotPassword

  // changeUserRole
  // countUsersByRole
}

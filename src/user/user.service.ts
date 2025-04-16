import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/user.schema';
import { hashPassword } from 'src/utils/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // create
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;
    return this.userModel.create(createUserDto);
  }

  // findOneById
  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).select('-_id -password').lean();
  }

  // findByEmail
  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).select('-_id -password').lean();
  }

  // findAll
  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').lean();
  }

  // update
  async update(id: string, user: UpdateUserDto): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true,
        lean: true,
      })
      .select('-_id -password')
      .lean();
  }

  // delete
  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).select('-_id -password').lean();
  }

  // updatePassword
  async updatePassword(id: string, password: string): Promise<User> {
    const hashedPassword = await hashPassword(password);
    return this.userModel.findByIdAndUpdate(id, { password: hashedPassword }).select('-_id -password').lean();
  }

  // forgotPassword

  // changeUserRole
  // countUsersByRole
}

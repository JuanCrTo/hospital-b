import {
  IsDateString,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
// import { IsPastDate } from 'src/decorators/IsPastDate.decorator';

export class CreatePatientDto {
  @IsNotEmpty({ message: 'ID is required' })
  @IsMongoId({ message: 'ID must be a valid MongoDB ObjectId' })
  userId: Types.ObjectId;

  @IsNotEmpty({ message: 'Identification  is required' })
  @IsString({ message: 'Identification  must be a string' })
  identification: string;

  @IsNotEmpty({ message: 'Firstname is required' })
  @IsString({ message: 'Firstname must be a string' })
  firstname: string;

  @IsNotEmpty({ message: 'Middlename is required' })
  @IsString({ message: 'Middlename must be a string' })
  middlename: string;

  @IsNotEmpty({ message: 'Lastname is required' })
  @IsString({ message: 'Lastname must be a string' })
  lastname: string;

  @IsNotEmpty({ message: 'Second Lastname is required' })
  @IsString({ message: 'Second Lastname must be a string' })
  secondlastname: string;

  // Create a decorator to validate the date is in the past
  @IsNotEmpty({ message: 'Birth is required' })
  @IsDateString({}, { message: 'Birth must be a valid date' })
  // @IsPastDate({
  //   message: 'Birth must be a date in the past',
  // })
  birth: string;

  //* Validate the age in service with a function
  // @IsNotEmpty({ message: 'Age is required' })
  // @IsInt({ message: 'Age must be an integer' })
  // @Min(0, { message: 'Age must be at least 0' })
  // @Max(110, { message: 'Age must be at most 110' })
  // age: number;
}

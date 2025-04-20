import {
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IsPastDate } from 'src/decorators/IsPastDate.decorator';

export class CreatePatientDto {
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

  @IsNotEmpty({ message: 'Birth is required' })
  @IsDateString({}, { message: 'Birth must be a valid date' })
  @IsPastDate({
    message: 'Birth must be a date in the past',
  })
  birth: string;

  // @IsOptional()
  // @IsString({ message: 'Location must be a string'})
  // location: string;
}

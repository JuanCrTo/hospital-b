import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  ValidateNested,
} from 'class-validator';
import { USER_ROLES, UserRole } from '../enums/user-role.enum';
import { CreatePatientDto } from 'src/patient/dto/create-patient.dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(
    { allow_display_name: false, require_tld: true },
    { message: 'Email must be a valid email address' },
  )
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsStrongPassword(
    {
      minLength: 6,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
    },
  )
  password: string;

  @IsEnum(USER_ROLES, {
    message: 'Role must be either doctor, nurse, or patient',
  })
  @IsNotEmpty({ message: 'Role is required' })
  role: UserRole;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreatePatientDto)
  patientDetails?: CreatePatientDto;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => CreateDoctorDto)
  // doctorDetails?: CreateDoctorDto;

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => CreateNurseDto)
  // nurseDetails?: CreateNurseDto;
}

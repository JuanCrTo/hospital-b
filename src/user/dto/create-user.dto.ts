import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

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

  @IsEnum(['doctor', 'nurse', 'patient'], {
    message: 'Role must be either doctor, nurse, or patient',
  })
  role: 'doctor' | 'nurse' | 'patient';
}

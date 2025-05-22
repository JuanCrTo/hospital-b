import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsString } from 'class-validator'
import { IsPastDate } from 'src/decorators/IsPastDate.decorator'

export class CreatePatientDto {
  @ApiProperty({
    description: 'The identification of the patient'
  })
  @IsNotEmpty({ message: 'Identification  is required' })
  @IsString({ message: 'Identification  must be a string' })
  identification: string

  @ApiProperty({
    description: 'The firstname of the patient'
  })
  @IsNotEmpty({ message: 'Firstname is required' })
  @IsString({ message: 'Firstname must be a string' })
  firstname: string

  @ApiProperty({
    description: 'The middlename of the patient'
  })
  @IsNotEmpty({ message: 'Middlename is required' })
  @IsString({ message: 'Middlename must be a string' })
  middlename: string

  @ApiProperty({
    description: 'The lastname of the patient'
  })
  @IsNotEmpty({ message: 'Lastname is required' })
  @IsString({ message: 'Lastname must be a string' })
  lastname: string

  @ApiProperty({
    description: 'The second lastname of the patient'
  })
  @IsNotEmpty({ message: 'Second Lastname is required' })
  @IsString({ message: 'Second Lastname must be a string' })
  secondlastname: string

  @ApiProperty({
    description: 'The birth of the patient'
  })
  @IsNotEmpty({ message: 'Birth is required' })
  @IsDateString({}, { message: 'Birth must be a valid date' })
  @IsPastDate({
    message: 'Birth must be a date in the past'
  })
  birth: string

  // [0]/formatted_address
  // formatted_address/types: street_address
  @ApiProperty({
    description: 'The address of the patient'
  })
  location: string
}

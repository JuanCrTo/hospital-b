import { PartialType } from '@nestjs/mapped-types'
import { CreatePatientDto } from './create-patient-request.dto'

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}

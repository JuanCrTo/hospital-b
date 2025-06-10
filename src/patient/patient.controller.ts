import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { PatientService } from './patient.service'
import { Patient } from './model/patient.schema'
import { UpdatePatientDto } from './dto/request/update-user-request.dto'
import { Public } from '@/decorators/public.decorator'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { CreatePatientDto } from './dto/request/create-patient-request.dto'
import { ApiAuthResponses } from '@/decorators/apiAuthResponse.decorator'

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @ApiBearerAuth('JWT-auth')
  @Put(':id')
  @ApiOperation({ summary: 'Update a patient by ID' })
  @ApiOkResponse({
    description: 'Patient updated successfully',
    type: CreatePatientDto
  })
  @ApiBody({
    description: 'Patient data',
    type: CreatePatientDto
  })
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto): Promise<Patient> {
    return this.patientService.update(id, updatePatientDto)
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiOkResponse({
    description: 'OK',
    type: [CreatePatientDto]
  })
  async findAll(): Promise<Patient[]> {
    return this.patientService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @ApiOperation({ summary: 'Get patient by ID' })
  @ApiOkResponse({
    description: 'OK',
    type: CreatePatientDto
  })
  async findById(@Param('id') id: string): Promise<Patient> {
    return this.patientService.findById(id)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('identification/:identification')
  @ApiOperation({ summary: 'Get patient by identification' })
  @ApiOkResponse({
    description: 'OK',
    type: CreatePatientDto
  })
  async findByIdentification(@Param('identification') identification: string): Promise<Patient> {
    return this.patientService.findByIdentification(identification)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('age/:age')
  @ApiOperation({ summary: 'Get patients by age' })
  @ApiOkResponse({
    description: 'OK',
    type: [CreatePatientDto]
  })
  async findByAge(@Param('age') age: number): Promise<Patient[]> {
    return this.patientService.findByAge(age)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('firstname/:firstname')
  @ApiOperation({ summary: 'Get patients by firstname' })
  @ApiOkResponse({
    description: 'OK',
    type: [CreatePatientDto]
  })
  @ApiAuthResponses()
  async findByFirstname(@Param('firstname') firstname: string): Promise<Patient[]> {
    return this.patientService.findByFirstname(firstname)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('lastname/:lastname')
  @ApiOperation({ summary: 'Get patients by lastname' })
  @ApiOkResponse({
    description: 'OK',
    type: [CreatePatientDto]
  })
  @ApiAuthResponses()
  async findByLastname(@Param('lastname') lastname: string): Promise<Patient[]> {
    return this.patientService.findByLastname(lastname)
  }
}

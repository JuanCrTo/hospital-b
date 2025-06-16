import { Body, Controller, Get, HttpCode, Param, Put } from '@nestjs/common'
import { PatientService } from './patient.service'
import { Patient } from './model/patient.schema'
import { UpdatePatientDto } from './dto/request/update-user-request.dto'
import { Public } from 'src/decorators/request/public.decorator'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { CreatePatientDto } from './dto/request/create-patient-request.dto'
import { ApiStandardError } from 'src/decorators/swagger/error.decorator'
import { ApiStandardResponse } from 'src/decorators/swagger/response.decorator'

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Public()
  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all patients' })
  @ApiStandardResponse(CreatePatientDto, 200)
  @ApiStandardError()
  async findAll(): Promise<Patient[]> {
    return this.patientService.findAll()
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get patient by ID' })
  @ApiStandardResponse(CreatePatientDto, 200)
  @ApiStandardError()
  async findById(@Param('id') id: string): Promise<Patient> {
    return this.patientService.findById(id)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('identification/:identification')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get patient by identification' })
  @ApiStandardResponse(CreatePatientDto, 200)
  @ApiStandardError()
  async findByIdentification(@Param('identification') identification: string): Promise<Patient> {
    return this.patientService.findByIdentification(identification)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('age/:age')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get patients by age' })
  @ApiStandardResponse(CreatePatientDto, 200)
  @ApiStandardError()
  async findByAge(@Param('age') age: number): Promise<Patient[]> {
    return this.patientService.findByAge(age)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('firstname/:firstname')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get patients by firstname' })
  @ApiStandardResponse(CreatePatientDto, 200)
  @ApiStandardError()
  async findByFirstname(@Param('firstname') firstname: string): Promise<Patient[]> {
    return this.patientService.findByFirstname(firstname)
  }

  @ApiBearerAuth('JWT-auth')
  @Get('lastname/:lastname')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get patients by lastname' })
  @ApiStandardResponse(CreatePatientDto, 200)
  @ApiStandardError()
  async findByLastname(@Param('lastname') lastname: string): Promise<Patient[]> {
    return this.patientService.findByLastname(lastname)
  }

  @ApiBearerAuth('JWT-auth')
  @Put(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a patient by ID' })
  @ApiStandardResponse(CreatePatientDto, 200)
  @ApiStandardError()
  @ApiBody({
    description: 'Patient data',
    type: CreatePatientDto
  })
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto): Promise<Patient> {
    return this.patientService.update(id, updatePatientDto)
  }
}

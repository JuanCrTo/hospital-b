import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './model/patient.schema';
import { UpdatePatientDto } from './dto/update-user.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  // !create a new patient
  /**
 * *Controller responsible for managing patient-related operations.
 * 
 * *Note: The `create` method is not implemented in this controller because the `create` operation is handled in the `UserController`.
 * *The `UserController` delegates the creation process to the `UserService`, which determines the role of the user (in this case, "patient") and subsequently calls the `create` method in the `PatientService` to create the patient.
 */

  @ApiBearerAuth('JWT-auth')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto): Promise<Patient> {
    return this.patientService.update(id, updatePatientDto);
  }

  // !delete a patient by ID
  /**
 * *Controller responsible for managing patient-related operations.
 * 
 * *Note: The `create` method is not implemented in this controller because the `create` operation is handled in the `UserController`.
 * *The `UserController` delegates the creation process to the `UserService`, which determines the role of the user (in this case, "patient") and subsequently calls the `create` method in the `PatientService` to create the patient.
 */

  @Public()
  @Get()
  async findAll():Promise<Patient[]>{
    return this.patientService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Patient> {
    return this.patientService.findById(id);
  }

  @ApiBearerAuth('JWT-auth')
  @Get('identification/:identification')
  async findByIdentification(@Param('identification') identification: string): Promise<Patient> {
    return this.patientService.findByIdentification(identification);
  }

  @ApiBearerAuth('JWT-auth')
  @Get('age/:age')
  async findByAge(@Param('age') age: number): Promise<Patient[]> {
    return this.patientService.findByAge(age);
  }

  @ApiBearerAuth('JWT-auth')
  @Get('firstname/:firstname')
  async findByFirstname(@Param('firstname') firstname: string): Promise<Patient[]> {
    return this.patientService.findByFirstname(firstname);
  }

  @ApiBearerAuth('JWT-auth')
  @Get('lastname/:lastname')
  async findByLastname(@Param('lastname') lastname: string): Promise<Patient[]> {
    return this.patientService.findByLastname(lastname);
  }

}

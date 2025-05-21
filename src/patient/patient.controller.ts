import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './model/patient.schema';
import { UpdatePatientDto } from './dto/update-user.dto';
import { Public } from 'src/decorators/public.decorator';

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

  // update a patient by ID
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

  // find all patients
  @Get()
  async findAll():Promise<Patient[]>{
    return this.patientService.findAll();
  }

  // find a patient by ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Patient> {
    return this.patientService.findById(id);
  }

  // find a patient by identification
  @Get('identification/:identification')
  async findByIdentification(@Param('identification') identification: string): Promise<Patient> {
    return this.patientService.findByIdentification(identification);
  }

  // find a patient by age
  @Get('age/:age')
  async findByAge(@Param('age') age: number): Promise<Patient[]> {
    return this.patientService.findByAge(age);
  }

  // find a patient by firstname
  @Get('firstname/:firstname')
  async findByFirstname(@Param('firstname') firstname: string): Promise<Patient[]> {
    return this.patientService.findByFirstname(firstname);
  }

  // find a patient by lastname
  @Get('lastname/:lastname')
  async findByLastname(@Param('lastname') lastname: string): Promise<Patient[]> {
    return this.patientService.findByLastname(lastname);
  }

}

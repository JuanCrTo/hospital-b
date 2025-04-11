import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { UserModule } from './user/user.module';
import { PacienteModule } from './paciente/paciente.module';
import { EnfermeroModule } from './enfermero/enfermero.module';
import { CitaModule } from './citas/cita.module';
import { HistorialModule } from './historial/historial.module';
import { MedicamentoModule } from './medicamento/medicamento.module';
import { NurseModule } from './nurse/nurse.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { MedicineModule } from './medicine/medicine.module';

@Module({
  imports: [DoctorModule, UserModule, PacienteModule, EnfermeroModule, CitaModule, HistorialModule, MedicamentoModule, NurseModule, PatientModule, AppointmentModule, MedicalRecordModule, MedicineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

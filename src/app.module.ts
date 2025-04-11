import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { UserModule } from './user/user.module';
import { NurseModule } from './nurse/nurse.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { MedicineModule } from './medicine/medicine.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DoctorModule, UserModule, NurseModule, PatientModule, AppointmentModule, MedicalRecordModule, MedicineModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

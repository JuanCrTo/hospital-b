import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DoctorModule } from './doctor/doctor.module'
import { UserModule } from './user/user.module'
import { NurseModule } from './nurse/nurse.module'
import { PatientModule } from './patient/patient.module'
import { AppointmentModule } from './appointment/appointment.module'
import { MedicalRecordModule } from './medical-record/medical-record.module'
import { MedicineModule } from './medicine/medicine.module'
import { AuthModule } from './auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { MongooseConfigService } from './mongoose-config/mongoose-config.service'
import { EmailModule } from './email/email.module'
import { PdfModule } from './pdf/pdf.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    DoctorModule,
    UserModule,
    NurseModule,
    PatientModule,
    AppointmentModule,
    MedicalRecordModule,
    MedicineModule,
    AuthModule,
    EmailModule,
    PdfModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

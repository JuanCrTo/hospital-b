import { Injectable, Logger } from '@nestjs/common'
import * as cron from 'node-cron'
import { PatientService } from 'src/patient/patient.service'

@Injectable()
export class PatientCron {
  private readonly logger = new Logger(PatientCron.name)

  constructor(private readonly patientService: PatientService) {
    this.init()
  }

  private init() {
    // Ejecutar cada 30 segundos
    cron.schedule('*/30 * * * * *', async () => {
      const patients = await this.patientService.findAll()
      this.logger.log(`Pacientes actualizados: ${patients.length}`)
    })
  }
}

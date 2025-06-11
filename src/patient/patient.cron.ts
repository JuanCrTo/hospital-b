import { Injectable, Logger } from '@nestjs/common'
import * as cron from 'node-cron'
import { PatientService } from './patient.service'

@Injectable()
export class PatientCron {
  private readonly logger = new Logger(PatientCron.name)

  constructor(private readonly patientService: PatientService) {
    this.init()
  }

  private init() {
    // Ejecutar cada 30 segundos
    cron.schedule('0 */6 * * *', async () => {
      const patients = await this.patientService.findAll()
      this.logger.log(`Pacientes actualizados: ${patients.length}`)
    })
  }
}

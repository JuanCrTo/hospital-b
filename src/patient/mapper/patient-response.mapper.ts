import { PatientResponseDto, LocationHistoryItemDto } from '../dto/response/patient-response.dto'
import { Patient } from 'src/patient/model/patient.schema'

export function mapPatientToDto(patient: Partial<Patient>): PatientResponseDto {
  if (!patient) return undefined

  let locationHistory: LocationHistoryItemDto[] | undefined = undefined
  if (Array.isArray(patient.locationHistory)) {
    locationHistory = patient.locationHistory.map(item => ({
      location: item.location,
      latitude: item.latitude,
      longitude: item.longitude,
      updatedAt: item.updatedAt
    }))
  }

  return {
    identification: patient.identification,
    firstname: patient.firstname,
    middlename: patient.middlename,
    lastname: patient.lastname,
    secondlastname: patient.secondlastname,
    birth: patient.birth,
    age: patient.age,
    clinicalage: patient.clinicalage,
    location: patient.location,
    latitude: patient.latitude,
    longitude: patient.longitude,
    locationHistory
  }
}

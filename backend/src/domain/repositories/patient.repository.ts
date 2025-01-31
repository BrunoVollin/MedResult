import { Patient } from "../entities/patient.entity";

export interface PatientRepository {
  save(patient: Patient): Promise<Patient>;
}

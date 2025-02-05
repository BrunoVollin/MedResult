import { Repository } from 'typeorm';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { PatientEntity } from '../entities/patient.entity';
import { Patient } from 'src/domain/entities/patient.entity';
export declare class TypeORMPatientRepository implements PatientRepository {
    private readonly repository;
    constructor(repository: Repository<PatientEntity>);
    save(patient: Patient): Promise<Patient>;
}

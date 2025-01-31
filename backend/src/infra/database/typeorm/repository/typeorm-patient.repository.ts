import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { PatientEntity } from '../entities/patient.entity';
import { Patient } from 'src/domain/entities/patient.entity';


@Injectable()
export class TypeORMPatientRepository implements PatientRepository {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly repository: Repository<PatientEntity>,
  ) {}

  async save(patient: Patient): Promise<Patient> {
    const PatientEntity = this.repository.create({
      document: patient.document,
      user: patient.user_id,
    });

    const savedPatient = await this.repository.save(PatientEntity);

    return new Patient(
      PatientEntity.id,
      PatientEntity.document,
      PatientEntity.user,
    );
  }
}

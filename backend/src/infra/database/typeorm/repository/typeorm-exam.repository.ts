import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamRepository } from 'src/domain/repositories/exam.repository';
import { ExamEntity } from '../entities/exam.entity';
import { Exam } from 'src/domain/entities/exam.entity';
import { PatientEntity } from '../entities/patient.entity';
import { LaboratoryEntity } from '../entities/laboratory.entity';

@Injectable()
export class TypeORMExamRepository implements ExamRepository {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly repository: Repository<ExamEntity>,
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(LaboratoryEntity)
    private readonly laboratoryRepository: Repository<LaboratoryEntity>,
  ) {}

  async save(exam: Exam): Promise<Exam> {
    const patient = await this.patientRepository.findOne({ where: { id: exam.patient_id } });
    const laboratory = await this.laboratoryRepository.findOne({ where: { id: exam.laboratory_id } });

    if (!patient || !laboratory) {
      throw new Error('Patient or Laboratory not found');
    }

    const examEntity = this.repository.create({
      file: exam.file,
      description: exam.description,
      patient: patient,
      laboratory: laboratory,
    });

    const savedExam = await this.repository.save(examEntity);

    return new Exam(
      savedExam.id,
      savedExam.file,
      savedExam.description,
      savedExam.patient.id,
      savedExam.laboratory.id,
    );
  }
}

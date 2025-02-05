import { Repository } from 'typeorm';
import { ExamRepository } from 'src/domain/repositories/exam.repository';
import { ExamEntity } from '../entities/exam.entity';
import { Exam } from 'src/domain/entities/exam.entity';
import { PatientEntity } from '../entities/patient.entity';
import { LaboratoryEntity } from '../entities/laboratory.entity';
export declare class TypeORMExamRepository implements ExamRepository {
    private readonly repository;
    private readonly patientRepository;
    private readonly laboratoryRepository;
    constructor(repository: Repository<ExamEntity>, patientRepository: Repository<PatientEntity>, laboratoryRepository: Repository<LaboratoryEntity>);
    save(exam: Exam): Promise<Exam>;
}

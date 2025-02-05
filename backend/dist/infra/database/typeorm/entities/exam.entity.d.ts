import { PatientEntity } from './patient.entity';
import { LaboratoryEntity } from './laboratory.entity';
export declare class ExamEntity {
    id: number;
    file: Buffer;
    description: string;
    patient: PatientEntity;
    laboratory: LaboratoryEntity;
    createdAt: Date;
    updatedAt: Date;
}

import { PatientEntity } from './patient.entity';
import { LaboratoryEntity } from './laboratory.entity';
export declare class UserEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    patients: PatientEntity;
    laboratory: LaboratoryEntity;
    createdAt: Date;
    updatedAt: Date;
}

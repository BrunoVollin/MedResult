import { UserEntity } from './user.entity';
import { ExamEntity } from './exam.entity';
export declare class PatientEntity {
    id: number;
    document: string;
    user: UserEntity;
    exams: ExamEntity[];
    createdAt: Date;
    updatedAt: Date;
}

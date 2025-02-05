import { UserEntity } from './user.entity';
import { ExamEntity } from './exam.entity';
export declare class LaboratoryEntity {
    id: number;
    name: string;
    logo: string;
    user: UserEntity;
    exams: ExamEntity[];
    createdAt: Date;
    updatedAt: Date;
}

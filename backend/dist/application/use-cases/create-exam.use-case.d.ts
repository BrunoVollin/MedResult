import { Exam } from 'src/domain/entities/exam.entity';
import { ExamRepository } from 'src/domain/repositories/exam.repository';
export declare class CreateExamUseCase {
    private readonly examRepository;
    constructor(examRepository: ExamRepository);
    execute(input: Input): Promise<Output>;
}
type Input = {
    description: string;
    patient_id: number;
    laboratory_id: number;
    file: Express.Multer.File;
};
type Output = {
    exam: Exam;
};
export {};

import { CreatePatientDto } from '../dtos/create-patient.dto';
import { CreatePatientUsecase } from 'src/application/use-cases/create-patient.use-case';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { CreateExamUseCase } from 'src/application/use-cases/create-exam.use-case';
import { ExamQuery } from 'src/domain/queries/exam.queries';
import { GetExamDto } from '../dtos/get-exam.dto';
export declare class LaboratoryController {
    private readonly createPatientUsecase;
    private readonly createExamUseCase;
    private readonly examQuery;
    constructor(createPatientUsecase: CreatePatientUsecase, createExamUseCase: CreateExamUseCase, examQuery: ExamQuery);
    login(body: CreatePatientDto): Promise<{
        token: string;
    }>;
    postExam(file: Express.Multer.File, body: CreateExamDto): Promise<{
        exam: import("../../domain/entities/exam.entity").Exam;
    }>;
    getExam(id: number, query: GetExamDto): Promise<import("src/domain/queries/exam.queries").OutputExamQuery>;
}

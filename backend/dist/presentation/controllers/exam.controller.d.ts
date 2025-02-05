import { CreatePatientUsecase } from 'src/application/use-cases/create-patient.use-case';
import { CreateExamUseCase } from 'src/application/use-cases/create-exam.use-case';
import { ExamQuery } from 'src/domain/queries/exam.queries';
import { Response } from 'express';
export declare class ExamController {
    private readonly createPatientUsecase;
    private readonly createExamUseCase;
    private readonly examQuery;
    constructor(createPatientUsecase: CreatePatientUsecase, createExamUseCase: CreateExamUseCase, examQuery: ExamQuery);
    downloadFile(id: number, res: Response): Promise<any>;
}

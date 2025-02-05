import { ExamQuery, InputExamQuery, OutputExamQuery } from 'src/domain/queries/exam.queries';
import { ExamEntity } from 'src/infra/database/typeorm/entities/exam.entity';
import { Repository } from 'typeorm';
export declare class TypeORMExamQuery implements ExamQuery {
    private readonly repository;
    constructor(repository: Repository<ExamEntity>);
    all(input: InputExamQuery): Promise<OutputExamQuery>;
    getFileById(id: number): Promise<ExamEntity>;
}

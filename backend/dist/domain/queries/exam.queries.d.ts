import { ExamEntity } from 'src/infra/database/typeorm/entities/exam.entity';
export interface ExamQuery {
    all(input: InputExamQuery): Promise<OutputExamQuery>;
    getFileById(id: number): Promise<ExamEntity>;
}
export type InputExamQuery = {
    page: number;
    limit: number;
    id?: number;
    startDate?: Date;
    endDate?: Date;
};
export type OutputExamQuery = {
    current_page: number;
    data: Array<any>;
    per_page: number;
    to: number;
    total: number;
};

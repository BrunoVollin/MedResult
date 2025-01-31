import { Exam } from '../entities/exam.entity';

export interface ExamRepository {
  save(exam: Exam): Promise<Exam>;
}

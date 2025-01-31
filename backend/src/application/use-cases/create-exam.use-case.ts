import { Inject, Injectable } from '@nestjs/common';
import { Exam } from 'src/domain/entities/exam.entity';
import { ExamRepository } from 'src/domain/repositories/exam.repository';

@Injectable()
export class CreateExamUseCase {
  constructor(
    @Inject('ExamRepository') private readonly examRepository: ExamRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const exam = new Exam(
      null,
      input.file.buffer,
      input.description,
      input.patient_id,
      input.laboratory_id,
    );
    const cretedExam = await this.examRepository.save(exam);
    return { exam: cretedExam };
  }
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

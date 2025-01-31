import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ExamQuery,
  InputExamQuery,
  OutputExamQuery,
} from 'src/domain/queries/exam.queries';
import { ExamEntity } from 'src/infra/database/typeorm/entities/exam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeORMExamQuery implements ExamQuery {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly repository: Repository<ExamEntity>,
  ) {}

  async all(input: InputExamQuery): Promise<OutputExamQuery> {
    const { page, limit, id, startDate, endDate } = input;

    const queryBuilder = this.repository
      .createQueryBuilder('exam')
      .select([
        'exam.id',
        'exam.description',
        'exam.createdAt',
        'exam.updatedAt',
        'exam.patientId',
        'exam.laboratoryId',
      ]);

    if (id) {
      queryBuilder.andWhere('exam.patientId = :id', { id });
    }

    if (startDate && endDate) {
      queryBuilder.andWhere('exam.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    } else if (startDate) {
      queryBuilder.andWhere('exam.createdAt >= :startDate', { startDate });
    } else if (endDate) {
      queryBuilder.andWhere('exam.createdAt <= :endDate', { endDate });
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    const [result, total] = await queryBuilder.getManyAndCount();

    return {
      current_page: page,
      data: result,
      per_page: limit,
      to: result.length,
      total,
    };
  }

  async getFileById(id: number): Promise<ExamEntity> {
    const exam = await this.repository.findOne({ where: { id } });
    return exam;
  }
}

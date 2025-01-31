import { Module } from '@nestjs/common';
import { LaboratoryController } from '../controllers/laboratory.controller';
import { CreatePatientUsecase } from 'src/application/use-cases/create-patient.use-case';
import { HashingService } from 'src/application/services/hashing.service';
import { CreateExamUseCase } from 'src/application/use-cases/create-exam.use-case';
import { ExamController } from '../controllers/exam.controller';

@Module({
  controllers: [LaboratoryController, ExamController],
  providers: [CreatePatientUsecase, HashingService, CreateExamUseCase],
})
export class LaboratoryModule {}

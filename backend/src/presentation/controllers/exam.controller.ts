import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  Get,
  Param,
  Query,
  Inject,
  HttpException,
} from '@nestjs/common';
import { CreatePatientDto } from '../dtos/create-patient.dto';
import { CreatePatientUsecase } from 'src/application/use-cases/create-patient.use-case';
import { AdmAuthGuard } from '../guards/adm-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { CreateExamUseCase } from 'src/application/use-cases/create-exam.use-case';
import { ExamQuery } from 'src/domain/queries/exam.queries';
import { GetExamDto } from '../dtos/get-exam.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Response } from 'express';

// @UseGuards(JwtAuthGuard)
@Controller('exam')
export class ExamController {
  constructor(
    private readonly createPatientUsecase: CreatePatientUsecase,
    private readonly createExamUseCase: CreateExamUseCase,
    @Inject('ExamQuery') private readonly examQuery: ExamQuery,
  ) {}

  @Get(':id/download')
  async downloadFile(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<any> {
    const exam = await this.examQuery.getFileById(id);

    if (!exam.file.toString('utf-8').startsWith('%PDF')) {
      throw new HttpException(
        'The file is not a valid PDF',
        HttpStatus.BAD_REQUEST,
      );
    }

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="exam-${id}.pdf"`,
    });

    return res.send(exam.file);
  }
}

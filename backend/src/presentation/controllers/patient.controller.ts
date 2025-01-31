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
} from '@nestjs/common';
import { CreatePatientDto } from '../dtos/create-patient.dto';
import { CreatePatientUsecase } from 'src/application/use-cases/create-patient.use-case';
import { AdmAuthGuard } from '../guards/adm-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateExamDto } from '../dtos/create-exam.dto';
import { CreateExamUseCase } from 'src/application/use-cases/create-exam.use-case';
import { ExamQuery } from 'src/domain/queries/exam.queries';
import { GetExamDto } from '../dtos/get-exam.dto';

// @UseGuards(AdmAuthGuard)
@Controller('laboratory')
export class LaboratoryController {
  constructor(
    private readonly createPatientUsecase: CreatePatientUsecase,
    private readonly createExamUseCase: CreateExamUseCase,
    @Inject('ExamQuery') private readonly examQuery: ExamQuery,
  ) {}

  @Post('patient')
  async login(@Body() body: CreatePatientDto) {
    return await this.createPatientUsecase.execute(body);
  }

  @Post('exam')
  @UseInterceptors(FileInterceptor('file'))
  async postExam(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
    @Body() body: CreateExamDto,
  ) {
    return await this.createExamUseCase.execute({ ...body, file });
  }

  @Get('exams/:id')
  async getExam(@Param('id') id: number, @Query() query: GetExamDto) {
    const result = await this.examQuery.all({
      id,
      page: query.page,
      limit: query.limit,
      startDate: query.startDate,
      endDate: query.endDate,
    });
    return result;
  }
}

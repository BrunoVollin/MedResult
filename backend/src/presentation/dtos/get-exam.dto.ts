import { IsNotEmpty } from 'class-validator';

export class GetExamDto {
  id: number;
  @IsNotEmpty({ message: 'page não pode estar vazio.' })
  page: number;
  @IsNotEmpty({ message: 'limit não pode estar vazio.' })
  limit: number;

  startDate?: Date;
  endDate?: Date;
}

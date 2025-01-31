import { IsNotEmpty } from 'class-validator';

export class CreateExamDto {
  @IsNotEmpty({ message: 'description não pode estar vazio.' })
  description: string;

  @IsNotEmpty({ message: 'patient_id não pode estar vazio.' })
  patient_id: number;

  @IsNotEmpty({ message: 'laboratory_id não pode estar vazio.' })
  laboratory_id: any;
}

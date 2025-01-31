import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PatientEntity } from './patient.entity';
import { LaboratoryEntity } from './laboratory.entity';

@Entity('exams')
export class ExamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bytea')
  file: Buffer;

  @Column()
  description: string;

  @ManyToOne(() => PatientEntity, (patient) => patient.exams)
  patient: PatientEntity;

  @ManyToOne(() => LaboratoryEntity, (laboratory) => laboratory.exams)
  laboratory: LaboratoryEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ExamEntity } from './exam.entity';

@Entity('patients')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document: string;

  @OneToOne(() => UserEntity, (user) => user.patients)
  user: UserEntity;

  @OneToMany(() => ExamEntity, (exam) => exam.patient)
  exams: ExamEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

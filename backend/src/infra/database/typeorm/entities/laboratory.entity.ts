import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { ExamEntity } from './exam.entity';

@Entity('laboratories')
export class LaboratoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @OneToOne(() => UserEntity, (user) => user.laboratory)
  user: UserEntity;

  @OneToMany(() => ExamEntity, (exam) => exam.laboratory)
  exams: ExamEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

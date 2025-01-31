import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { PatientEntity } from './patient.entity';
import { LaboratoryEntity } from './laboratory.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToOne(() => PatientEntity, (patient) => patient.user)
  patients: PatientEntity;

  @ManyToOne(() => LaboratoryEntity, (laboratory) => laboratory.user)
  laboratory: LaboratoryEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { TypeORMUserRepository } from './repository/typeorm-user.repository';
import { ExamEntity } from './entities/exam.entity';
import { PatientEntity } from './entities/patient.entity';
import { LaboratoryEntity } from './entities/laboratory.entity';
import { TypeORMPatientRepository } from './repository/typeorm-patient.repository';
import { TypeORMExamRepository } from './repository/typeorm-exam.repository';
import { TypeORMExamQuery } from './queries/typeorm-exam.query';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): DataSourceOptions => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [UserEntity, ExamEntity, PatientEntity, LaboratoryEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([
      UserEntity,
      PatientEntity,
      ExamEntity,
      LaboratoryEntity,
    ]),
  ],
  providers: [
    { provide: 'UserRepository', useClass: TypeORMUserRepository },
    { provide: 'PatientRepository', useClass: TypeORMPatientRepository },
    { provide: 'ExamRepository', useClass: TypeORMExamRepository },
    { provide: 'ExamQuery', useClass: TypeORMExamQuery },
  ],
  exports: [
    'UserRepository',
    'PatientRepository',
    'ExamRepository',
    'ExamQuery',
  ],
})
export class TypeORMDatabaseModule {}

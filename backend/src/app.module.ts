import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeORMDatabaseModule } from './infra/database/typeorm/typeorm-database.module';
import { AuthenticateUserUseCase } from './application/use-cases/authenticate-user.use-case';
import { ConfigModule } from '@nestjs/config';
import { HashingService } from './application/services/hashing.service';
import { AuthModule } from './presentation/modules/auth.module';
import { LaboratoryModule } from './presentation/modules/laboratory.module';
import { ExamController } from './presentation/controllers/exam.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    // InMemoryDatabaseModule,
    TypeORMDatabaseModule,
    LaboratoryModule,
  ],
  controllers: [AppController],
  providers: [AuthenticateUserUseCase, HashingService],
})
export class AppModule {}

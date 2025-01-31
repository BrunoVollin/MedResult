import { Global, Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.use-case';
import { InMemoryUserRepository } from '../../infra/database/in-memory/in-memory-user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { HashingService } from 'src/application/services/hashing.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthenticateUserUseCase, JwtAuthGuard, HashingService],
  exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}

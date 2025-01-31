import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Patient } from 'src/domain/entities/patient.entity';
import { User } from 'src/domain/entities/user.entity';
import { UserRoleEnum } from 'src/domain/enum/user-role.enum';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { HashingService } from '../services/hashing.service';
import { PayloadTokenType } from '../types/payload-token.type';

@Injectable()
export class CreatePatientUsecase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('PatientRepository')
    private readonly patientRepository: PatientRepository,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: Input): Promise<Output> {
    const password = await this.hashingService.hash(input.password);

    const newUser = new User(
      null,
      input.name,
      password,
      input.email,
      input.laboratory_id,
      UserRoleEnum.Patient,
    );
    const user = await this.userRepository.save(newUser);

    const newPatient = new Patient(null, input.document, user.id);

    const patient = await this.patientRepository.save(newPatient);

    const payload: PayloadTokenType = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return {
      token,
    };
  }
}

type Input = {
  email: string;
  password: string;
  name: string;
  laboratory_id: any | null;
  document: string;
};

type Output = {
  token: string;
};

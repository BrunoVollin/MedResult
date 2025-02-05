import { JwtService } from '@nestjs/jwt';
import { PatientRepository } from 'src/domain/repositories/patient.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { HashingService } from '../services/hashing.service';
export declare class CreatePatientUsecase {
    private readonly userRepository;
    private readonly patientRepository;
    private readonly hashingService;
    private readonly jwtService;
    constructor(userRepository: UserRepository, patientRepository: PatientRepository, hashingService: HashingService, jwtService: JwtService);
    execute(input: Input): Promise<Output>;
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
export {};

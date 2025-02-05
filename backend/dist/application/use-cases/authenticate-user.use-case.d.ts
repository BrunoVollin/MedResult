import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { HashingService } from '../services/hashing.service';
export declare class AuthenticateUserUseCase {
    private readonly userRepository;
    private readonly jwtService;
    private readonly hashingService;
    constructor(userRepository: UserRepository, jwtService: JwtService, hashingService: HashingService);
    execute(input: Input): Promise<string>;
}
type Input = {
    email: string;
    password: string;
};
export {};

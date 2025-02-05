import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.use-case';
import { LoginDto } from '../dtos/login.dto';
export declare class AuthController {
    private readonly authenticateUserUseCase;
    constructor(authenticateUserUseCase: AuthenticateUserUseCase);
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
}

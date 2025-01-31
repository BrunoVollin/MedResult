import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticateUserUseCase } from '../../application/use-cases/authenticate-user.use-case';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const token = await this.authenticateUserUseCase.execute(loginDto);
    return { token };
  }
}

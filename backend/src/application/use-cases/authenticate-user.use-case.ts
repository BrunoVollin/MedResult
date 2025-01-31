import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { HashingService } from '../services/hashing.service';
import { PayloadTokenType } from '../types/payload-token.type';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
  ) {}

  async execute(input: Input): Promise<string> {
    const user = await this.userRepository.findByEmail(input.email);

    console.log('user', user);

    const isPasswordValid = await this.hashingService.compare(
      input.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: PayloadTokenType = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}

type Input = {
  email: string;
  password: string;
};

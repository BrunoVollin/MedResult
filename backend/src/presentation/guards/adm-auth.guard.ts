import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Global,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PayloadTokenType } from 'src/application/types/payload-token.type';
import { UserRoleEnum } from 'src/domain/enum/user-role.enum';

@Global()
@Injectable()
export class AdmAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload: PayloadTokenType = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      request.user = payload;
      if (payload.role !== UserRoleEnum.Admin) {
        throw new UnauthorizedException('User not authorized');
      }
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.slice(7);
    }
    return undefined;
  }
}

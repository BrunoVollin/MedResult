import { Global, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Global()
@Injectable()
export class HashingService {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

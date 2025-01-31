import { Request } from 'express';
import { PayloadTokenType } from 'src/application/types/payload-token.type';

declare module 'express' {
  export interface Request {
    user?: PayloadTokenType;
  }
}

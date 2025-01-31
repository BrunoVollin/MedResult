import { UserRoleEnum } from '../enum/user-role.enum';

export class User {
  constructor(
    public id: any | null,
    public name: string,
    public password: string,
    public email: string,
    public laboratory_id: any | null,
    public role: UserRoleEnum,
  ) {}
}

import { UserRoleEnum } from '../enum/user-role.enum';
export declare class User {
    id: any | null;
    name: string;
    password: string;
    email: string;
    laboratory_id: any | null;
    role: UserRoleEnum;
    constructor(id: any | null, name: string, password: string, email: string, laboratory_id: any | null, role: UserRoleEnum);
}

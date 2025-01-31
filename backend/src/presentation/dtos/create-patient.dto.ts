import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRoleEnum } from 'src/domain/enum/user-role.enum';

export class CreatePatientDto {
    @IsEmail({}, { message: 'Email inválido.' })
    email: string;

    @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    password: string;

    @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
    name: string;

    @IsNotEmpty({ message: 'O laboratory_id não pode estar vazio.' })
    laboratory_id: any;

    @IsNotEmpty({ message: 'O documento não pode estar vazio.' })
    document: string;
}

import { Repository } from 'typeorm';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { User } from 'src/domain/entities/user.entity';
export declare class TypeORMUserRepository implements UserRepository {
    private readonly repository;
    constructor(repository: Repository<UserEntity>);
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<User>;
}

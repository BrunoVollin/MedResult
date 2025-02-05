import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
export declare class InMemoryUserRepository implements UserRepository {
    private users;
    private readonly filePath;
    constructor();
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<User>;
    private generateUniqueId;
    private loadFromFile;
    private saveToFile;
}

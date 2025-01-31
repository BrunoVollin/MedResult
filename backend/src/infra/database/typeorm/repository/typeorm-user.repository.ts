import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserEntity } from '../entities/user.entity';
import { User } from 'src/domain/entities/user.entity';
import { UserRoleEnum } from 'src/domain/enum/user-role.enum';

@Injectable()
export class TypeORMUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { email },
      relations: ['laboratory'],
    });

    if (!userEntity) return null;

    console.log('userEntity', userEntity.laboratory);

    return new User(
      userEntity.id,
      userEntity.name,
      userEntity.password,
      userEntity.email,
      userEntity.laboratory.id,
      userEntity.role as UserRoleEnum,
    );
  }

  async save(user: User): Promise<User> {
    const userEntity = this.repository.create({
      name: user.name,
      password: user.password,
      email: user.email,
      role: user.role,
      laboratory: user?.laboratory_id,
    });

    const savedUser = await this.repository.save(userEntity);

    return new User(
      userEntity.id,
      userEntity.name,
      userEntity.password,
      userEntity.email,
      userEntity.laboratory.id,
      userEntity.role as UserRoleEnum,
    );
  }
}

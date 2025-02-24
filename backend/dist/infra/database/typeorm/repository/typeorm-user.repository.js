"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMUserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const user_entity_2 = require("../../../../domain/entities/user.entity");
let TypeORMUserRepository = class TypeORMUserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async findByEmail(email) {
        const userEntity = await this.repository.findOne({
            where: { email },
            relations: ['laboratory'],
        });
        if (!userEntity)
            return null;
        console.log('userEntity', userEntity.laboratory);
        return new user_entity_2.User(userEntity.id, userEntity.name, userEntity.password, userEntity.email, userEntity.laboratory.id, userEntity.role);
    }
    async save(user) {
        const userEntity = this.repository.create({
            name: user.name,
            password: user.password,
            email: user.email,
            role: user.role,
            laboratory: user?.laboratory_id,
        });
        const savedUser = await this.repository.save(userEntity);
        return new user_entity_2.User(userEntity.id, userEntity.name, userEntity.password, userEntity.email, userEntity.laboratory.id, userEntity.role);
    }
};
exports.TypeORMUserRepository = TypeORMUserRepository;
exports.TypeORMUserRepository = TypeORMUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TypeORMUserRepository);
//# sourceMappingURL=typeorm-user.repository.js.map
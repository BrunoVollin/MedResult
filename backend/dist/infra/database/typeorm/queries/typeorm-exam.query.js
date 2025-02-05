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
exports.TypeORMExamQuery = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exam_entity_1 = require("../entities/exam.entity");
const typeorm_2 = require("typeorm");
let TypeORMExamQuery = class TypeORMExamQuery {
    constructor(repository) {
        this.repository = repository;
    }
    async all(input) {
        const { page, limit, id, startDate, endDate } = input;
        const queryBuilder = this.repository
            .createQueryBuilder('exam')
            .select([
            'exam.id',
            'exam.description',
            'exam.createdAt',
            'exam.updatedAt',
            'exam.patientId',
            'exam.laboratoryId',
        ]);
        if (id) {
            queryBuilder.andWhere('exam.patientId = :id', { id });
        }
        if (startDate && endDate) {
            queryBuilder.andWhere('exam.createdAt BETWEEN :startDate AND :endDate', {
                startDate,
                endDate,
            });
        }
        else if (startDate) {
            queryBuilder.andWhere('exam.createdAt >= :startDate', { startDate });
        }
        else if (endDate) {
            queryBuilder.andWhere('exam.createdAt <= :endDate', { endDate });
        }
        queryBuilder.skip((page - 1) * limit).take(limit);
        const [result, total] = await queryBuilder.getManyAndCount();
        return {
            current_page: page,
            data: result,
            per_page: limit,
            to: result.length,
            total,
        };
    }
    async getFileById(id) {
        const exam = await this.repository.findOne({ where: { id } });
        return exam;
    }
};
exports.TypeORMExamQuery = TypeORMExamQuery;
exports.TypeORMExamQuery = TypeORMExamQuery = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(exam_entity_1.ExamEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeORMExamQuery);
//# sourceMappingURL=typeorm-exam.query.js.map
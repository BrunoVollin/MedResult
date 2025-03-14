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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaboratoryEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const exam_entity_1 = require("./exam.entity");
let LaboratoryEntity = class LaboratoryEntity {
};
exports.LaboratoryEntity = LaboratoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LaboratoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LaboratoryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LaboratoryEntity.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.laboratory),
    __metadata("design:type", user_entity_1.UserEntity)
], LaboratoryEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exam_entity_1.ExamEntity, (exam) => exam.laboratory),
    __metadata("design:type", Array)
], LaboratoryEntity.prototype, "exams", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], LaboratoryEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], LaboratoryEntity.prototype, "updatedAt", void 0);
exports.LaboratoryEntity = LaboratoryEntity = __decorate([
    (0, typeorm_1.Entity)('laboratories')
], LaboratoryEntity);
//# sourceMappingURL=laboratory.entity.js.map
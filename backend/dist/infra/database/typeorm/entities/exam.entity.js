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
exports.ExamEntity = void 0;
const typeorm_1 = require("typeorm");
const patient_entity_1 = require("./patient.entity");
const laboratory_entity_1 = require("./laboratory.entity");
let ExamEntity = class ExamEntity {
};
exports.ExamEntity = ExamEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ExamEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('bytea'),
    __metadata("design:type", Buffer)
], ExamEntity.prototype, "file", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExamEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => patient_entity_1.PatientEntity, (patient) => patient.exams),
    __metadata("design:type", patient_entity_1.PatientEntity)
], ExamEntity.prototype, "patient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => laboratory_entity_1.LaboratoryEntity, (laboratory) => laboratory.exams),
    __metadata("design:type", laboratory_entity_1.LaboratoryEntity)
], ExamEntity.prototype, "laboratory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ExamEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], ExamEntity.prototype, "updatedAt", void 0);
exports.ExamEntity = ExamEntity = __decorate([
    (0, typeorm_1.Entity)('exams')
], ExamEntity);
//# sourceMappingURL=exam.entity.js.map
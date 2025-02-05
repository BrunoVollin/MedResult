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
exports.CreateExamUseCase = void 0;
const common_1 = require("@nestjs/common");
const exam_entity_1 = require("../../domain/entities/exam.entity");
let CreateExamUseCase = class CreateExamUseCase {
    constructor(examRepository) {
        this.examRepository = examRepository;
    }
    async execute(input) {
        const exam = new exam_entity_1.Exam(null, input.file.buffer, input.description, input.patient_id, input.laboratory_id);
        const cretedExam = await this.examRepository.save(exam);
        return { exam: cretedExam };
    }
};
exports.CreateExamUseCase = CreateExamUseCase;
exports.CreateExamUseCase = CreateExamUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ExamRepository')),
    __metadata("design:paramtypes", [Object])
], CreateExamUseCase);
//# sourceMappingURL=create-exam.use-case.js.map
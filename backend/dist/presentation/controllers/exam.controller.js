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
exports.ExamController = void 0;
const common_1 = require("@nestjs/common");
const create_patient_use_case_1 = require("../../application/use-cases/create-patient.use-case");
const create_exam_use_case_1 = require("../../application/use-cases/create-exam.use-case");
let ExamController = class ExamController {
    constructor(createPatientUsecase, createExamUseCase, examQuery) {
        this.createPatientUsecase = createPatientUsecase;
        this.createExamUseCase = createExamUseCase;
        this.examQuery = examQuery;
    }
    async downloadFile(id, res) {
        const exam = await this.examQuery.getFileById(id);
        if (!exam.file.toString('utf-8').startsWith('%PDF')) {
            throw new common_1.HttpException('The file is not a valid PDF', common_1.HttpStatus.BAD_REQUEST);
        }
        res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': `attachment; filename="exam-${id}.pdf"`,
        });
        return res.send(exam.file);
    }
};
exports.ExamController = ExamController;
__decorate([
    (0, common_1.Get)(':id/download'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "downloadFile", null);
exports.ExamController = ExamController = __decorate([
    (0, common_1.Controller)('exam'),
    __param(2, (0, common_1.Inject)('ExamQuery')),
    __metadata("design:paramtypes", [create_patient_use_case_1.CreatePatientUsecase,
        create_exam_use_case_1.CreateExamUseCase, Object])
], ExamController);
//# sourceMappingURL=exam.controller.js.map
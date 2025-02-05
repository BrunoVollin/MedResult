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
exports.LaboratoryController = void 0;
const common_1 = require("@nestjs/common");
const create_patient_dto_1 = require("../dtos/create-patient.dto");
const create_patient_use_case_1 = require("../../application/use-cases/create-patient.use-case");
const platform_express_1 = require("@nestjs/platform-express");
const create_exam_dto_1 = require("../dtos/create-exam.dto");
const create_exam_use_case_1 = require("../../application/use-cases/create-exam.use-case");
const get_exam_dto_1 = require("../dtos/get-exam.dto");
let LaboratoryController = class LaboratoryController {
    constructor(createPatientUsecase, createExamUseCase, examQuery) {
        this.createPatientUsecase = createPatientUsecase;
        this.createExamUseCase = createExamUseCase;
        this.examQuery = examQuery;
    }
    async login(body) {
        return await this.createPatientUsecase.execute(body);
    }
    async postExam(file, body) {
        return await this.createExamUseCase.execute({ ...body, file });
    }
    async getExam(id, query) {
        const result = await this.examQuery.all({
            id,
            page: query.page,
            limit: query.limit,
            startDate: query.startDate,
            endDate: query.endDate,
        });
        return result;
    }
};
exports.LaboratoryController = LaboratoryController;
__decorate([
    (0, common_1.Post)('patient'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_patient_dto_1.CreatePatientDto]),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('exam'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [new common_1.MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })],
    }))),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_exam_dto_1.CreateExamDto]),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "postExam", null);
__decorate([
    (0, common_1.Get)('exams/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, get_exam_dto_1.GetExamDto]),
    __metadata("design:returntype", Promise)
], LaboratoryController.prototype, "getExam", null);
exports.LaboratoryController = LaboratoryController = __decorate([
    (0, common_1.Controller)('laboratory'),
    __param(2, (0, common_1.Inject)('ExamQuery')),
    __metadata("design:paramtypes", [create_patient_use_case_1.CreatePatientUsecase,
        create_exam_use_case_1.CreateExamUseCase, Object])
], LaboratoryController);
//# sourceMappingURL=patient.controller.js.map
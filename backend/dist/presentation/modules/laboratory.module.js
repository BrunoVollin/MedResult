"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaboratoryModule = void 0;
const common_1 = require("@nestjs/common");
const laboratory_controller_1 = require("../controllers/laboratory.controller");
const create_patient_use_case_1 = require("../../application/use-cases/create-patient.use-case");
const hashing_service_1 = require("../../application/services/hashing.service");
const create_exam_use_case_1 = require("../../application/use-cases/create-exam.use-case");
const exam_controller_1 = require("../controllers/exam.controller");
let LaboratoryModule = class LaboratoryModule {
};
exports.LaboratoryModule = LaboratoryModule;
exports.LaboratoryModule = LaboratoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [laboratory_controller_1.LaboratoryController, exam_controller_1.ExamController],
        providers: [create_patient_use_case_1.CreatePatientUsecase, hashing_service_1.HashingService, create_exam_use_case_1.CreateExamUseCase],
    })
], LaboratoryModule);
//# sourceMappingURL=laboratory.module.js.map
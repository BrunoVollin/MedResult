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
exports.TypeORMExamRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const exam_entity_1 = require("../entities/exam.entity");
const exam_entity_2 = require("../../../../domain/entities/exam.entity");
const patient_entity_1 = require("../entities/patient.entity");
const laboratory_entity_1 = require("../entities/laboratory.entity");
let TypeORMExamRepository = class TypeORMExamRepository {
    constructor(repository, patientRepository, laboratoryRepository) {
        this.repository = repository;
        this.patientRepository = patientRepository;
        this.laboratoryRepository = laboratoryRepository;
    }
    async save(exam) {
        const patient = await this.patientRepository.findOne({ where: { id: exam.patient_id } });
        const laboratory = await this.laboratoryRepository.findOne({ where: { id: exam.laboratory_id } });
        if (!patient || !laboratory) {
            throw new Error('Patient or Laboratory not found');
        }
        const examEntity = this.repository.create({
            file: exam.file,
            description: exam.description,
            patient: patient,
            laboratory: laboratory,
        });
        const savedExam = await this.repository.save(examEntity);
        return new exam_entity_2.Exam(savedExam.id, savedExam.file, savedExam.description, savedExam.patient.id, savedExam.laboratory.id);
    }
};
exports.TypeORMExamRepository = TypeORMExamRepository;
exports.TypeORMExamRepository = TypeORMExamRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(exam_entity_1.ExamEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(patient_entity_1.PatientEntity)),
    __param(2, (0, typeorm_2.InjectRepository)(laboratory_entity_1.LaboratoryEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], TypeORMExamRepository);
//# sourceMappingURL=typeorm-exam.repository.js.map
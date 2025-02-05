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
exports.TypeORMPatientRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const patient_entity_1 = require("../entities/patient.entity");
const patient_entity_2 = require("../../../../domain/entities/patient.entity");
let TypeORMPatientRepository = class TypeORMPatientRepository {
    constructor(repository) {
        this.repository = repository;
    }
    async save(patient) {
        const PatientEntity = this.repository.create({
            document: patient.document,
            user: patient.user_id,
        });
        const savedPatient = await this.repository.save(PatientEntity);
        return new patient_entity_2.Patient(PatientEntity.id, PatientEntity.document, PatientEntity.user);
    }
};
exports.TypeORMPatientRepository = TypeORMPatientRepository;
exports.TypeORMPatientRepository = TypeORMPatientRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(patient_entity_1.PatientEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TypeORMPatientRepository);
//# sourceMappingURL=typeorm-patient.repository.js.map
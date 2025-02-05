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
exports.CreatePatientUsecase = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const patient_entity_1 = require("../../domain/entities/patient.entity");
const user_entity_1 = require("../../domain/entities/user.entity");
const user_role_enum_1 = require("../../domain/enum/user-role.enum");
const hashing_service_1 = require("../services/hashing.service");
let CreatePatientUsecase = class CreatePatientUsecase {
    constructor(userRepository, patientRepository, hashingService, jwtService) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
    }
    async execute(input) {
        const password = await this.hashingService.hash(input.password);
        const newUser = new user_entity_1.User(null, input.name, password, input.email, input.laboratory_id, user_role_enum_1.UserRoleEnum.Patient);
        const user = await this.userRepository.save(newUser);
        const newPatient = new patient_entity_1.Patient(null, input.document, user.id);
        const patient = await this.patientRepository.save(newPatient);
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload);
        return {
            token,
        };
    }
};
exports.CreatePatientUsecase = CreatePatientUsecase;
exports.CreatePatientUsecase = CreatePatientUsecase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepository')),
    __param(1, (0, common_1.Inject)('PatientRepository')),
    __metadata("design:paramtypes", [Object, Object, hashing_service_1.HashingService,
        jwt_1.JwtService])
], CreatePatientUsecase);
//# sourceMappingURL=create-patient.use-case.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./entities/user.entity");
const typeorm_user_repository_1 = require("./repository/typeorm-user.repository");
const exam_entity_1 = require("./entities/exam.entity");
const patient_entity_1 = require("./entities/patient.entity");
const laboratory_entity_1 = require("./entities/laboratory.entity");
const typeorm_patient_repository_1 = require("./repository/typeorm-patient.repository");
const typeorm_exam_repository_1 = require("./repository/typeorm-exam.repository");
const typeorm_exam_query_1 = require("./queries/typeorm-exam.query");
let TypeORMDatabaseModule = class TypeORMDatabaseModule {
};
exports.TypeORMDatabaseModule = TypeORMDatabaseModule;
exports.TypeORMDatabaseModule = TypeORMDatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('POSTGRES_HOST'),
                    port: configService.get('POSTGRES_PORT'),
                    username: configService.get('POSTGRES_USER'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_DB'),
                    entities: [user_entity_1.UserEntity, exam_entity_1.ExamEntity, patient_entity_1.PatientEntity, laboratory_entity_1.LaboratoryEntity],
                    synchronize: true,
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.UserEntity,
                patient_entity_1.PatientEntity,
                exam_entity_1.ExamEntity,
                laboratory_entity_1.LaboratoryEntity,
            ]),
        ],
        providers: [
            { provide: 'UserRepository', useClass: typeorm_user_repository_1.TypeORMUserRepository },
            { provide: 'PatientRepository', useClass: typeorm_patient_repository_1.TypeORMPatientRepository },
            { provide: 'ExamRepository', useClass: typeorm_exam_repository_1.TypeORMExamRepository },
            { provide: 'ExamQuery', useClass: typeorm_exam_query_1.TypeORMExamQuery },
        ],
        exports: [
            'UserRepository',
            'PatientRepository',
            'ExamRepository',
            'ExamQuery',
        ],
    })
], TypeORMDatabaseModule);
//# sourceMappingURL=typeorm-database.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const typeorm_database_module_1 = require("./infra/database/typeorm/typeorm-database.module");
const authenticate_user_use_case_1 = require("./application/use-cases/authenticate-user.use-case");
const config_1 = require("@nestjs/config");
const hashing_service_1 = require("./application/services/hashing.service");
const auth_module_1 = require("./presentation/modules/auth.module");
const laboratory_module_1 = require("./presentation/modules/laboratory.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            auth_module_1.AuthModule,
            typeorm_database_module_1.TypeORMDatabaseModule,
            laboratory_module_1.LaboratoryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [authenticate_user_use_case_1.AuthenticateUserUseCase, hashing_service_1.HashingService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
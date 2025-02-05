"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const in_memory_user_repository_1 = require("./in-memory-user.repository");
let InMemoryDatabaseModule = class InMemoryDatabaseModule {
};
exports.InMemoryDatabaseModule = InMemoryDatabaseModule;
exports.InMemoryDatabaseModule = InMemoryDatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [],
        providers: [{ provide: 'UserRepository', useClass: in_memory_user_repository_1.InMemoryUserRepository }],
        exports: ['UserRepository'],
    })
], InMemoryDatabaseModule);
//# sourceMappingURL=in-memory-database.module.js.map
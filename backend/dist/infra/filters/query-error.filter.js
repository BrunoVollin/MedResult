"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
let QueryErrorFilter = class QueryErrorFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException ? exception.getStatus() : 500;
        const detail = exception.detail;
        if (typeof detail === 'string' && detail.includes('already exists')) {
            const messageStart = exception.table.split('_').join(' ') + ' with';
            const message = exception.detail.replace('Key', messageStart);
            response.status(400).json({
                statusCode: 400,
                message: [message],
                error: 'Bad Request',
            });
        }
        else {
            response.status(status).json({
                statusCode: status,
                message: exception.message,
                error: exception.name,
            });
        }
    }
};
exports.QueryErrorFilter = QueryErrorFilter;
exports.QueryErrorFilter = QueryErrorFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], QueryErrorFilter);
//# sourceMappingURL=query-error.filter.js.map
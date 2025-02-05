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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let InMemoryUserRepository = class InMemoryUserRepository {
    constructor() {
        this.users = [];
        this.filePath = path.resolve('users.json');
        this.loadFromFile();
    }
    async findByEmail(email) {
        return this.users.find(user => user.email === email) || null;
    }
    async save(user) {
        user.id = this.generateUniqueId();
        this.users.push(user);
        this.saveToFile();
        return user;
    }
    generateUniqueId() {
        return Math.random().toString(36).substr(2, 9);
    }
    loadFromFile() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            this.users = JSON.parse(data);
        }
        catch (error) {
            console.error('Error loading users from file:', error.message);
            this.users = [];
        }
    }
    saveToFile() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2), 'utf-8');
        }
        catch (error) {
            console.error('Error saving users to file:', error.message);
        }
    }
};
exports.InMemoryUserRepository = InMemoryUserRepository;
exports.InMemoryUserRepository = InMemoryUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InMemoryUserRepository);
//# sourceMappingURL=in-memory-user.repository.js.map
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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("@m8a/nestjs-typegoose");
const account_model_1 = require("./account.model");
let AccountService = class AccountService {
    constructor(AccountModel) {
        this.AccountModel = AccountModel;
    }
    async getAll(searchTerm) {
        let options = {};
        if (searchTerm)
            options = { $or: [{ name: new RegExp(searchTerm, 'i') }] };
        return await this.AccountModel.find(options)
            .select('-createdAt -updatedAt -__v')
            .sort({ createdAt: 'desc' })
            .exec();
    }
    async bySlug(slug) {
        const account = await this.AccountModel.findOne({ slug });
        if (!account)
            throw new common_1.NotFoundException(`Account with slug ${slug} not found`);
        return account;
    }
    async getCount() {
        return await this.AccountModel.find().countDocuments().exec();
    }
    async create() {
        const defaultValue = {
            name: '',
            slug: '',
            images: [],
            tags: [],
            price: 0,
        };
        const account = await this.AccountModel.create(defaultValue);
        return account._id;
    }
    async update(_id, dto) {
        const updateAccount = await this.AccountModel.findByIdAndUpdate(_id, dto, {
            new: true,
        }).exec();
        if (!updateAccount)
            throw new common_1.NotFoundException(`Account not found`);
        return updateAccount;
    }
    async byId(_id) {
        const account = await this.AccountModel.findById(_id);
        if (!account)
            throw new common_1.NotFoundException(`Account with id ${_id} not found`);
        return account;
    }
    async delete(_id) {
        const deletedAccount = await this.AccountModel.findByIdAndDelete(_id).exec();
        if (!deletedAccount)
            throw new common_1.NotFoundException(`Account not found`);
        return deletedAccount;
    }
};
exports.AccountService = AccountService;
exports.AccountService = AccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_typegoose_1.InjectModel)(account_model_1.AccountModel)),
    __metadata("design:paramtypes", [Object])
], AccountService);
//# sourceMappingURL=account.service.js.map
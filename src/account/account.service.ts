import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { AccountModel } from './account.model';
import { AddAccountDto } from './dto/addAccount.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(AccountModel)
    private readonly AccountModel: ModelType<AccountModel>,
  ) {}

  async getAll(searchTerm?: string) {
    let options = {};

    if (searchTerm) options = { $or: [{ name: new RegExp(searchTerm, 'i') }] };

    return await this.AccountModel.find(options)
      .select('-createdAt -updatedAt -__v')
      .sort({ createdAt: 'desc' })
      .exec();
  }

  async bySlug(slug: string) {
    const account = await this.AccountModel.findOne({ slug });
    if (!account)
      throw new NotFoundException(`Account with slug ${slug} not found`);

    return account;
  }

  async getCount() {
    return await this.AccountModel.find().countDocuments().exec();
  }

  // Admin place
  async create() {
    const defaultValue: AddAccountDto = {
      name: '',
      slug: '',
      images: [],
      tags: [],
      price: 0,
      parameters: {
        outfits: 0,
        level: 0,
        emotes: 0,
        gliders: 0,
        vbucks: 0,
        pickaxes: 0,
        backbling: 0,
        loadings: 0,
      },
    };
    const account = await this.AccountModel.create(defaultValue);
    return account._id;
  }

  async update(_id: string, dto: AddAccountDto) {
    const updateAccount = await this.AccountModel.findByIdAndUpdate(_id, dto, {
      new: true,
    }).exec();

    if (!updateAccount) throw new NotFoundException(`Account not found`);

    return updateAccount;
  }

  async byId(_id: string) {
    const account = await this.AccountModel.findById(_id);
    if (!account)
      throw new NotFoundException(`Account with id ${_id} not found`);

    return account;
  }

  async delete(_id: string) {
    const deletedAccount =
      await this.AccountModel.findByIdAndDelete(_id).exec();

    if (!deletedAccount) throw new NotFoundException(`Account not found`);

    return deletedAccount;
  }
}

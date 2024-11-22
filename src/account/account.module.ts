import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { AccountModel } from './account.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AccountModel,
        schemaOptions: {
          collection: 'Account',
        },
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}

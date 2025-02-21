import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { IdValidationPipe } from '../pipes/id.validation.pipe';
import { AddAccountDto } from './dto/addAccount.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('by-slug/:slug')
  async bySlug(@Param('slug') slug: string) {
    const account = await this.accountService.bySlug(slug);
    if (!account)
      throw new NotFoundException(`Account with slug ${slug} not found`);
    return account;
  }

  @Get('count')
  async getCountAccounts() {
    return this.accountService.getCount();
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.accountService.getAll(searchTerm);
  }

  @Get(':id')
  @Auth('admin')
  async byId(@Param('id', IdValidationPipe) id: string) {
    return this.accountService.byId(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.accountService.create();
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: AddAccountDto,
  ) {
    return this.accountService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return this.accountService.delete(id);
  }
}

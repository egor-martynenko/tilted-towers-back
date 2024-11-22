import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface AccountModel extends Base {}
export class AccountModel extends TimeStamps {
  @prop()
  name: string;

  @prop()
  slug: string;

  @prop()
  images: string[];

  @prop()
  tags: string[];

  @prop()
  price: number;
}

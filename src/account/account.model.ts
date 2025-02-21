import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class Parameters {
  @prop()
  outfits: number;

  @prop()
  level: number;

  @prop()
  emotes: number;

  @prop()
  gliders: number;

  @prop()
  vbucks: number;

  @prop()
  pickaxes: number;

  @prop()
  backbling: number;

  @prop()
  loadings: number;
}
class Image {
  @prop()
  url: string;

  @prop()
  name: string;
}

export interface AccountModel extends Base {}
export class AccountModel extends TimeStamps {
  @prop()
  name: string;

  @prop()
  slug: string;

  @prop({ type: () => [Image] })
  images: Image[];

  @prop({ type: () => [String] })
  tags: string[];

  @prop()
  price: number;

  @prop({ type: () => Parameters })
  parameters: Parameters;
}

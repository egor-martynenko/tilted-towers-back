import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';
export class Parameters {
  @IsNumber()
  outfits: number;

  @IsNumber()
  level: number;

  @IsNumber()
  emotes: number;

  @IsNumber()
  gliders: number;

  @IsNumber()
  vbucks: number;

  @IsNumber()
  pickaxes: number;

  @IsNumber()
  backbling: number;

  @IsNumber()
  loadings: number;
}
export class Image {
  @IsString()
  url: string;

  @IsString()
  name: string;
}
export class AddAccountDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsArray()
  images: string[];

  @IsObject()
  parameters: Parameters;

  @IsArray()
  tags: string[];

  @IsNumber()
  price: number;
}

import { IsArray, IsNumber, IsString } from 'class-validator';

export class AddAccountDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsArray()
  images: string[];

  @IsArray()
  tags: string[];

  @IsNumber()
  price: number;
}

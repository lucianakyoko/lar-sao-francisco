import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class NeedItemDto {
  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateNeedItemDto {
  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}

import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateNeedItemDto {
  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      const clean = value.replace(/[^0-9,.-]/g, '').replace(',', '.');
      return parseFloat(clean);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  })
  @IsNumber()
  price?: number;
}

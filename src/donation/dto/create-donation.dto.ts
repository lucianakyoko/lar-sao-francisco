import {
  IsMongoId,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

class DonatedItemDto {
  @IsMongoId()
  itemId: string;

  @IsNumber()
  quantity: number;
}

export class CreateDonationDto {
  @IsOptional()
  @IsString()
  donorName?: string;

  @IsMongoId()
  animalId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DonatedItemDto)
  donatedItems: DonatedItemDto[];

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
  extraAmount?: number;
}

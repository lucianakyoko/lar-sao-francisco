import {
  IsMongoId,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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
  @IsNumber()
  extraAmount?: number;
}

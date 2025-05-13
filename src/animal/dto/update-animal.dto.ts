import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

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

export class UpdateAnimalDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthDate?: Date;

  @IsOptional()
  @IsString()
  personality?: string;

  @IsOptional()
  @IsEnum(['pequeno', 'medio', 'grande'], {
    message:
      'size must be one of the following values: pequeno, medio or grande',
  })
  size?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  vaccinated?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  neutered?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateNeedItemDto)
  needsList?: UpdateNeedItemDto[];

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  availableForAdoption?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}

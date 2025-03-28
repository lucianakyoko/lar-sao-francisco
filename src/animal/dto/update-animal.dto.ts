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
import { Type } from 'class-transformer';

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
  @IsEnum(['pequeno', 'médio', 'grande'], {
    message:
      'size must be one of the following values: pequeno, médio or grande',
  })
  size?: string;

  @IsOptional()
  @IsBoolean()
  vaccinated?: boolean;

  @IsOptional()
  @IsBoolean()
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
  availableForAdoption?: boolean;
}

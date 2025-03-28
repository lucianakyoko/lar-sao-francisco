import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

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

export class CreateAnimalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthDate: Date;

  @IsNotEmpty()
  @IsString()
  personality: string;

  @IsNotEmpty()
  @IsEnum(['pequeno', 'médio', 'grande'], {
    message:
      'size must be one of the following values: pequeno, médio or grande',
  })
  size: string;

  @IsNotEmpty()
  @IsBoolean()
  vaccinated: boolean;

  @IsNotEmpty()
  @IsBoolean()
  neutered: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NeedItemDto)
  needsList?: NeedItemDto[];

  @IsNotEmpty()
  @IsString()
  about: string;

  @IsNotEmpty()
  @IsBoolean()
  availableForAdoption: boolean;
}

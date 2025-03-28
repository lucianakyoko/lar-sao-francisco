import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
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
  @IsEnum(['small', 'medium', 'big'], {
    message: 'size must be one of the following values: small, medium or big',
  })
  size: string;

  @IsNotEmpty()
  @IsBoolean()
  vaccinated: boolean;

  @IsNotEmpty()
  @IsBoolean()
  neutered: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NeedItemDto)
  needsList: NeedItemDto[];

  @IsNotEmpty()
  @IsString()
  about: string;

  @IsNotEmpty()
  @IsBoolean()
  availableForAdoption: boolean;
}

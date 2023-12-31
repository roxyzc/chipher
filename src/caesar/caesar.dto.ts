import {
  IsString,
  IsNumber,
  Max,
  Min,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { IsAlpha } from 'src/decorators/IsAlpha.decorator';

export class CaesarEncryptDto {
  @MaxLength(1000)
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  text: string;

  @Max(100)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  key: number;
}

export class CaesarDecryptDto {
  @IsString()
  @MaxLength(300)
  @IsNotEmpty()
  @IsAlpha()
  chipherText: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(100)
  @Min(1)
  key: number;
}

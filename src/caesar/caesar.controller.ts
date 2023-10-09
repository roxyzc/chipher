import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CaesarService } from './caesar.service';
import { CaesarDecryptDto, CaesarEncryptDto } from './caesar.dto';

@Controller('caesar')
export class CaesarController {
  constructor(private readonly caesarService: CaesarService) {}

  @Post('encrypt')
  public caesarEncrypt(@Body() body: CaesarEncryptDto) {
    const data = this.caesarService.encrypt(body);
    return {
      httpCode: HttpStatus.OK,
      message: 'Success',
      data,
    };
  }

  @Post('decrypt')
  public caesarDecrypt(@Body() body: CaesarDecryptDto) {
    const data = this.caesarService.decrypt(body);
    return {
      httpCode: HttpStatus.OK,
      message: 'Success',
      data,
    };
  }
}

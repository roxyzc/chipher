import { Module } from '@nestjs/common';
import { CaesarService } from './caesar.service';
import { CaesarController } from './caesar.controller';

@Module({
  providers: [CaesarService],
  controllers: [CaesarController],
  exports: [CaesarService],
})
export class CaesarModule {}

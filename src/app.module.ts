import { Module } from '@nestjs/common';
import { CaesarModule } from './caesar/caesar.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './filter/custom-exceptions.filter';

@Module({
  imports: [CaesarModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule {}

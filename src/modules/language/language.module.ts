import { Module } from '@nestjs/common';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Language, LanguageSchema } from './models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Language.name, schema: LanguageSchema },
    ]),
  ],
  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule {}

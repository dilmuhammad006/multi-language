import { Module } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { TranslateController } from './translate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Definition,
  DefinitionSchema,
  Translate,
  TranslateSchema,
} from './models';
import { Language, LanguageSchema } from '../language';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Translate.name, schema: TranslateSchema },
      { name: Language.name, schema: LanguageSchema },
      { name: Definition.name, schema: DefinitionSchema },
    ]),
  ],
  providers: [TranslateService],
  controllers: [TranslateController],
})
export class TranslateModule {}

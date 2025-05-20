import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './models';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import {
  Definition,
  DefinitionSchema,
  Translate,
  TranslateSchema,
  TranslateService,
} from '../translate';
import { Language, LanguageSchema } from '../language';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Translate.name, schema: TranslateSchema },
      { name: Definition.name, schema: DefinitionSchema },
      { name: Language.name, schema: LanguageSchema },
    ]),
  ],
  providers: [CategoryService, TranslateService],
  controllers: [CategoryController],
})
export class CategoryModule {}

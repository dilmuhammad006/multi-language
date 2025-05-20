import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Definition,
  DefinitionSchema,
  Translate,
  TranslateSchema,
  TranslateService,
} from '../translate';
import { Language, LanguageSchema } from '../language';
import { ProductService } from './product.service';
import { ProductController } from './product.contoller';
import { Product, ProductSchema } from './models';
import { Category, CategorySchema } from '../category';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Translate.name, schema: TranslateSchema },
      { name: Definition.name, schema: DefinitionSchema },
      { name: Language.name, schema: LanguageSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [ProductService, TranslateService],
  controllers: [ProductController],
})
export class ProductModule {}

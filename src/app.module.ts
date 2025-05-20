import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LanguageModule, ProductModule, TranslateModule } from './modules';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(
      process.env.DB_URL ? String(process.env.DB_URL) : 'test',
    ),
    LanguageModule,
    TranslateModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}

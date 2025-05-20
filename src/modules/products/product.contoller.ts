import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos';
import { ApiHeader } from '@nestjs/swagger';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @ApiHeader({
    name: 'language',
    description: 'Request language',
    enum: ['uz', 'ru', 'en'],
    required: true,
    example: 'uz',
  })
  @Get()
  async getAll(@Headers('language') language: string) {
    return this.service.getAll(language);
  }

  @Post()
  async create(@Body() payload: CreateProductDto) {
    return this.service.create(payload);
  }
}

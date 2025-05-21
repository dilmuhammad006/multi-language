import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateDto } from './dtos';
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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() name: UpdateDto) {
    return this.service.update(id, name);
  }
}

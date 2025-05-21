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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos';
import { ApiHeader } from '@nestjs/swagger';
import { UpdateDto } from '../products';

@Controller('categories')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @ApiHeader({
    name: 'language',
    description: 'Request language',
    enum: ['uz', 'ru', 'en'],
    required: true,
    example: 'uz',
  })
  @Get()
  getAll(@Headers('language') language: string) {
    return this.service.getAll(language);
  }

  @Post()
  async create(@Body() body: CreateCategoryDto) {
    return await this.service.create(body);
  }

  @Delete(':id')
  async delete(@Param() id: string) {
    return this.service.delete(id);
  }

  @Put(':id')
  async update(@Body() name: UpdateDto, @Param() id: string) {
    return this.service.update(id, name);
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dtos';

@Controller('lang')
export class LanguageController {
  constructor(private readonly service: LanguageService) {}

  @Get()
  async getAll() {
    return this.service.getAll();
  }

  @Post()
  async create(@Body() body: CreateLanguageDto) {
    return this.service.create(body);
  }
}

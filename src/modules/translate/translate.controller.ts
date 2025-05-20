import { Body, Controller, Get, Post } from '@nestjs/common';
import { TranslateService } from './translate.service';
import { CreateTranslateDto } from './dtos';

@Controller('translates')
export class TranslateController {
  constructor(private readonly servcie: TranslateService) {}

  @Get()
  async getALl() {
    return await this.servcie.getAll();
  }

  @Post()
  async create(@Body() body: CreateTranslateDto) {
    return this.servcie.create(body);
  }
}

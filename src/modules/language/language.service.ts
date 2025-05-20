import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Language } from './models';
import { Model } from 'mongoose';
import { CreateLanguageDto } from './dtos';

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language.name) private readonly langModel: Model<Language>,
  ) {}

  async getAll() {
    const languages = await this.langModel.find();

    return {
      message: 'success',
      count: languages.length,
      data: languages,
    };
  }

  async create(payload: CreateLanguageDto) {
    const founded = await this.langModel.findOne({
      title: payload.title,
      code: payload.code,
    });

    if (founded) {
      throw new ConflictException('This language already exists');
    }

    const lang = await this.langModel.create({
      title: payload.title,
      code: payload.code,
    });

    return {
      message: 'success',
      data: lang,
    };
  }
}

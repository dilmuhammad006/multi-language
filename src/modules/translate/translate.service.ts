import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Definition, Translate } from './models';
import { Language } from '../language';
import { Model } from 'mongoose';
import { CreateTranslateDto } from './dtos';

@Injectable()
export class TranslateService {
  constructor(
    @InjectModel(Translate.name) private translateModel: Model<Translate>,
    @InjectModel(Definition.name) private definitionModel: Model<Definition>,
    @InjectModel(Language.name) private languageModel: Model<Language>,
  ) {}

  async getAll() {
    const translates = await this.translateModel.find().populate('definitions');
    return {
      count: translates.length,
      data: translates,
    };
  }

  async create(payload: CreateTranslateDto) {
    const translate = await this.translateModel.create({
      code: payload.code,
    });

    for (let key of Object.keys(payload.definitions)) {
      const lang = await this.languageModel.findOne({ code: key });

      const definition = await this.definitionModel.create({
        value: payload.definitions[key],
        translateId: translate?._id,
        languageId: lang?._id,
      });

      await this.translateModel.updateOne(
        { _id: translate._id },
        { $push: { definitions: definition._id } },
      );
    }

    return {
      message: 'success',
    };
  }

  async getTransLate(lang: string, translateId: string) {
    const language = await this.languageModel.findOne({ code: lang });

    const definition = await this.definitionModel.findOne({
      translateId,
      languageId: language?._id,
    });

    return definition?.value || ''
  }
}

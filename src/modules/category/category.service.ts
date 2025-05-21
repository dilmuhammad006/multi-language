import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { TranslateService } from '../translate';
import { CreateCategoryDto } from './dtos';
import { Category } from './models';
import { UpdateDto } from '../products';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private translateService: TranslateService,
  ) {}

  async getAll(language: string) {
    const res: any = [];
    const categories = await this.categoryModel.find();

    for (let c of categories) {
      const name = await this.translateService.getTransLate(language, c.name);

      res.push({ ...c.toObject(), name });
    }

    return {
      count: res.length,
      data: res,
    };
  }

  async create(payload: CreateCategoryDto) {
    const founded = await this.categoryModel.findOne({ name: payload.name });

    if (founded) {
      throw new ConflictException('This category already exists');
    }
    const category = await this.categoryModel.create({ name: payload.name });

    return {
      message: 'success',
      data: category,
    };
  }

  async delete(id: string) {
    const founded = await this.categoryModel.findOne({ _id: id });

    if (!founded) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryModel.findOneAndDelete({ id });

    return {
      message: 'success',
    };
  }

  async update(id: string, name: UpdateDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid');
    }

    const founded = await this.categoryModel.findOne({ _id: id });

    if (!founded) {
      throw new NotFoundException('Category not found');
    }

    const category = await this.categoryModel.findByIdAndUpdate(
      { id },
      { name: name.name },
    );

    return {
      message: 'success',
      date: category,
    };
  }
}

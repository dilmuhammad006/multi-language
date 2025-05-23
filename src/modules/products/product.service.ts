import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './models';
import { isValidObjectId, Model } from 'mongoose';
import { TranslateService } from '../translate';
import { CreateProductDto, UpdateDto } from './dtos';
import { Category } from '../category';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private readonly translateService: TranslateService,
  ) {}

  async getAll(language: string) {
    const res: any = [];
    const products = await this.productModel.find();

    for (let p of products) {
      const name = await this.translateService.getTransLate(language, p.name);

      res.push({ ...p.toObject(), name });
    }

    return {
      count: res.length,
      data: res,
    };
  }

  async create(payload: CreateProductDto) {
    const founded = await this.productModel.findOne({ name: payload.name });

    if (founded) {
      throw new ConflictException('This Product already exists');
    }

    if (!isValidObjectId(payload.category_id)) {
      throw new BadRequestException('Id is not valid');
    }

    const products = await this.productModel.create({
      name: payload.name,
      price: payload.price,
      category_id: payload.category_id,
    });

    return {
      message: 'success',
      data: products,
    };
  }

  async delete(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid');
    }

    const founded = await this.productModel.findById({ id });

    if (!founded) {
      throw new NotFoundException('Product not found');
    }

    await this.productModel.findByIdAndDelete({ id });

    return {
      message: 'success',
    };
  }

  async update(id: string, name: UpdateDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Id is not valid');
    }

    const founded = await this.productModel.findById({ id });

    if (!founded) {
      throw new NotFoundException('Product not found');
    }

    const product = await this.productModel.findByIdAndUpdate(
      { _id: id },
      { name: name.name },
    );

    return {
      message: 'success',
      data: product,
    };
  }
}

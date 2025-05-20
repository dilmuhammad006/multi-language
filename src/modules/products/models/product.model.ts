import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'products', timestamps: true, versionKey: false })
export class Product {
  @Prop({ type: SchemaTypes.ObjectId })
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'categories' })
  category_id: string;

  @Prop({ type: SchemaTypes.Int32 })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

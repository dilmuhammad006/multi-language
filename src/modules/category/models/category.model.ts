import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'categories', timestamps: true, versionKey: false })
export class Category {
  @Prop({ type: SchemaTypes.ObjectId })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

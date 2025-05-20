import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

@Schema({ collection: 'definitions', timestamps: true, versionKey: false })
export class Definition {
  @Prop({})
  value: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Language' })
  languageId: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Translate' })
  translateId: string;
}

export const DefinitionSchema = SchemaFactory.createForClass(Definition);

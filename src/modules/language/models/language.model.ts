import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ collection: 'languages', timestamps: true, versionKey: false })
export class Language {
  @Prop({ maxlength: 64 })
  title: string;

  @Prop({ maxlength: 2, unique: true })
  code: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);

import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';

@Schema()
export class Category {
  @Prop({ type: String })
  name: string;
  @Prop({ type: Boolean, default: false })
  all?: boolean;
}
export const CategorySchema = SchemaFactory.createForClass(Category);

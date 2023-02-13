import { SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Servicio {
  @Prop({ type: String })
  name: string;
  @Prop({ type: String })
  description: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category', default: null })
  category: Types.ObjectId;
}

export const ServicioSchema = SchemaFactory.createForClass(Servicio);

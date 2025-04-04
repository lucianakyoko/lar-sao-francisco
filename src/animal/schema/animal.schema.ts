import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type AnimalDocument = Animal & Document;
export interface NeedItem {
  _id?: ObjectId;
  image: string;
  name: string;
  price: number;
}

@Schema({ timestamps: true })
export class Animal {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  personality: string;

  @Prop({ required: true, enum: ['pequeno', 'médio', 'grande'] })
  size: string;

  @Prop({ required: true })
  vaccinated: boolean;

  @Prop({ required: true })
  neutered: boolean;

  @Prop({ type: [{ image: String, name: String, price: Number }], default: [] })
  needsList: NeedItem[];

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  availableForAdoption: boolean;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);

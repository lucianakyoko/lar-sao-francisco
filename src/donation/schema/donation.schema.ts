import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DonationDocument = Donation & Document;

class DonatedItem {
  @Prop({ type: Types.ObjectId, ref: 'Animal.needsList', required: true })
  itemId: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  quantity: number;
}

@Schema({ timestamps: true })
export class Donation {
  @Prop({ type: String, default: 'Anônimo' })
  donorName: string;

  @Prop({ type: Types.ObjectId, ref: 'Animal', required: true })
  animalId: Types.ObjectId;

  @Prop({ type: [DonatedItem], default: [] })
  donatedItems: DonatedItem[];

  @Prop({ default: 0 })
  extraAmount: number;
}

export const DonationSchema = SchemaFactory.createForClass(Donation);

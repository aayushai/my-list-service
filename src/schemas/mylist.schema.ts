import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MyList {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  itemId: string;
}

export type MyListDocument = MyList & Document;
export const MyListSchema = SchemaFactory.createForClass(MyList);

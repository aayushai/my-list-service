import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;
type Genre = 'Action' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Romance' | 'SciFi';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: {
      favoriteGenres: [String],
      dislikedGenres: [String],
    }
  })
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };

  @Prop({
    type: [{
      contentId: String,
      watchedOn: Date,
      rating: Number,
    }]
  })
  watchHistory: Array<{
    contentId: string;
    watchedOn: Date;
    rating?: number;
  }>;
}

export const UserSchema = SchemaFactory.createForClass(User);

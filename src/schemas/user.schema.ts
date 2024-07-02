import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type Genre = 'Action' | 'Comedy' | 'Drama' | 'Fantasy' | 'Horror' | 'Romance' | 'SciFi';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  username: string;

  @Prop({
    favoriteGenres: [String],
    dislikedGenres: [String],
  })
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };

  @Prop({
    watchHistory: [{
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

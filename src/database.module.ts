// src/database.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { MovieSchema } from './schemas/movie.schema';
import { TVShowSchema } from './schemas/tvshow.schema';
import { MyListSchema } from './schemas/mylist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: 'TVShow', schema: TVShowSchema }]),
    MongooseModule.forFeature([{ name: 'MyList', schema: MyListSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: 'TVShow', schema: TVShowSchema }]),
    MongooseModule.forFeature([{ name: 'MyList', schema: MyListSchema }]),
  ],
})
export class DatabaseModule {}

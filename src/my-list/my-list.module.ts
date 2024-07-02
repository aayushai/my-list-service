import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MyListService } from './my-list.service';
import { MyListController } from './my-list.controller';
import { MyListSchema } from '../schemas/mylist.schema';
import { UserSchema } from '../schemas/user.schema';
import { MovieSchema } from '../schemas/movie.schema';
import { TVShowSchema } from '../schemas/tvshow.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'MyList', schema: MyListSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    MongooseModule.forFeature([{ name: 'TVShow', schema: TVShowSchema }]),
  ],
  controllers: [MyListController],
  providers: [MyListService],
})
export class MyListModule {}

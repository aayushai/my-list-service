import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MyList, MyListDocument } from '../schemas/mylist.schema';
import { AddToListDto } from './dto/add-to-list.dto';

@Injectable()
export class MyListService {
  private readonly logger = new Logger(MyListService.name);

  constructor(@InjectModel(MyList.name) private myListModel: Model<MyListDocument>) {}

  async addToMyList(addToListDto: AddToListDto): Promise<MyList> {
    const { userId, itemId } = addToListDto;
    const existingItem = await this.myListModel.findOne({ userId, itemId }).exec();
    if (existingItem) {
      throw new Error('Item already in list');
    }
    const newListItem = new this.myListModel({ userId, itemId });
    return await newListItem.save();
  }

  async removeFromMyList(userId: string, itemId: string): Promise<void> {
    await this.myListModel.deleteOne({ userId, itemId }).exec();
  }

  async listMyItems(userId: string, page: number, limit: number): Promise<MyList[]> {
    return this.myListModel.find({ userId })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }
}

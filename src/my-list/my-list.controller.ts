import { Controller, Post, Body, Get, Query, HttpException, HttpStatus } from '@nestjs/common';
import { MyListService } from './my-list.service';
import { AddToListDto } from './dto/add-to-list.dto';

@Controller('my-list')
export class MyListController {
  constructor(private readonly myListService: MyListService) {}

  @Post('add')
  async addToList(@Body() addToListDto: AddToListDto) {
    try {
      const newListItem = await this.myListService.addToMyList(addToListDto);
      return { message: 'Item added to list', newListItem };
    } catch (error) {
      if (error.message === 'Item already in list') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('remove')
  async removeFromList(@Body('userId') userId: string, @Body('itemId') itemId: string) {
    try {
      await this.myListService.removeFromMyList(userId, itemId);
      return { message: 'Item removed from list' };
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('list')
  async listItems(@Query('userId') userId: string, @Query('page') page = 1, @Query('limit') limit = 10) {
    try {
      const items = await this.myListService.listMyItems(userId, +page, +limit);
      return { items };
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

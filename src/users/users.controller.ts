import { Controller, Post, Body, Get, Param, Put, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async createUser(@Body('username') username: string, @Body('password') password: string) {
    try {
      const user = await this.usersService.createUser(username, password);
      return { message: 'User created successfully', user };
    } catch (error) {
      if (error.message === 'Username already exists') {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    try {
      const user = await this.usersService.findUserById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':userId/preferences')
  async updateUserPreferences(@Param('userId') userId: string, @Body('preferences') preferences: string[]) {
    try {
      const user = await this.usersService.updateUserPreferences(userId, preferences);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

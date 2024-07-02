import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(username: string, password: string): Promise<User> {
    try {
      const newUser = new this.userModel({ username, password, preferences: [] });
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error
        this.logger.error(`Username ${username} already exists.`);
        throw new Error('Username already exists');
      }
      this.logger.error(`Failed to create user: ${username}`, error.stack);
      throw new Error('Failed to create user');
    }
  }

  async findUserById(userId: string): Promise<User | null> {
    try {
      return await this.userModel.findById(userId).exec();
    } catch (error) {
      this.logger.error(`Failed to find user: ${userId}`, error.stack);
      throw new Error('Failed to find user');
    }
  }

  async updateUserPreferences(userId: string, preferences: string[]): Promise<User> {
    try {
      return await this.userModel.findByIdAndUpdate(userId, { preferences }, { new: true }).exec();
    } catch (error) {
      this.logger.error(`Failed to update preferences for user: ${userId}`, error.stack);
      throw new Error('Failed to update preferences');
    }
  }
}

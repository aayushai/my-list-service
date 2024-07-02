import { IsString } from 'class-validator';

export class RemoveFromListDto {
  @IsString()
  userId: string;

  @IsString()
  itemId: string;
}

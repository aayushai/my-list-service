import { IsString } from 'class-validator';

export class AddToListDto {
  @IsString()
  userId: string;

  @IsString()
  itemId: string;
}

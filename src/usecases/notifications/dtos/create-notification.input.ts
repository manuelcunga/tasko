import { IsString } from 'class-validator';

export class CreateNotificationInput {
  userID: string;

  @IsString()
  message: string;

  read: boolean;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWalletInput {
  @IsString()
  @IsNotEmpty()
  userID: string;

  @IsString()
  @IsNotEmpty()
  balance: number;
}

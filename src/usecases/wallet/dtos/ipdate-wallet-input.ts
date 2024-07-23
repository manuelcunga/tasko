import { IsOptional, IsString } from 'class-validator';

export class UpdateWalletInput {
  @IsString()
  @IsOptional()
  userID?: string;

  @IsString()
  @IsOptional()
  balance?: number;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class LoginInput {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

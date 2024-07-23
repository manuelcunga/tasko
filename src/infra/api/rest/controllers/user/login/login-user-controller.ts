import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginInput } from 'src/usecases/auth/dtos/login.input';
import { LoginOutput } from 'src/usecases/auth/dtos/login.output';
import { LoginService } from 'src/usecases/auth/login/login.service';

@Controller('/auth/sign-in')
export class LoginUserController {
  constructor(private readonly loginUserUsecase: LoginService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async handler(@Body() login: LoginInput): Promise<LoginOutput> {
    const user = await this.loginUserUsecase.validateUser(login);
    return user;
  }
}

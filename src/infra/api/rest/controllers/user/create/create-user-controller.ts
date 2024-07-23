import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserUsecase } from 'src/usecases/user/create/create-user.usecase';
import { CreateUserInput } from 'src/usecases/user/dtos/create-user-input';
import { UserOutput } from 'src/usecases/user/dtos/user-output';

@Controller('/auth/signup')
export class CreateUserController {
  constructor(private readonly createUserUsecase: CreateUserUsecase) {}

  @Post()
  @UsePipes(ValidationPipe)
  async handler(@Body() userInput: CreateUserInput): Promise<UserOutput> {
    const user = await this.createUserUsecase.execute(userInput);
    return user;
  }
}

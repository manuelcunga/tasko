import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateuserProviderUsecase } from 'src/usecases/user/create-provider/create-provider-usecase';
import { CreateUserInput } from 'src/usecases/user/dtos/create-user-input';
import { UserOutput } from 'src/usecases/user/dtos/user-output';

@Controller('/auth/provider/signup')
export class CreateProviderUserController {
  constructor(private readonly createUserUsecase: CreateuserProviderUsecase) {}

  @Post()
  @UsePipes(ValidationPipe)
  async handler(@Body() userInput: CreateUserInput): Promise<UserOutput> {
    const user = await this.createUserUsecase.execute(userInput);
    return user;
  }
}

import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
} from '@nestjs/common';
import { RestAuthGuard } from 'src/usecases/auth/guards/jwt-auth.guard';
import { UpdateUserInput } from 'src/usecases/user/dtos/update-user-input';
import { UserOutput } from 'src/usecases/user/dtos/user-output';
import { UpdateUserUsecase } from 'src/usecases/user/update/update-user.usecase';

@Controller('/users/:userID')
export class UpdateUserController {
  constructor(private readonly updateUserUsecase: UpdateUserUsecase) {}

  @UseGuards(RestAuthGuard)
  @Put()
  @UsePipes(ValidationPipe)
  async handler(@Body() userInput: UpdateUserInput): Promise<UserOutput> {
    const user = await this.updateUserUsecase.execute(userInput);
    return user;
  }
}

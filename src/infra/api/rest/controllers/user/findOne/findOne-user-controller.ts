import {
  Controller,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
} from '@nestjs/common';
import { UserOutput } from 'src/usecases/user/dtos/user-output';
import { FindUserOneUsecase } from 'src/usecases/user/findOne/find-one-user.usecase';

@Controller('/users/:userID')
export class FindOneUserController {
  constructor(private readonly findOneUserUsecase: FindUserOneUsecase) {}

  @Get()
  @UsePipes(ValidationPipe)
  async handler(@Param('userID') userID: string): Promise<UserOutput> {
    const user = await this.findOneUserUsecase.execute(userID);
    return user;
  }
}

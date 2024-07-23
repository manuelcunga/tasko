import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/infra/decorator/roles-user.decorator';
import { RestAuthGuard } from 'src/usecases/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/usecases/auth/guards/roles.guard';
import { UserOutput } from 'src/usecases/user/dtos/user-output';
import { FindAllUserUsecase } from 'src/usecases/user/lidtAll/list-all.usecase';

@Controller('/users')
export class FindAllUserController {
  constructor(private readonly findAllUserUsecase: FindAllUserUsecase) {}

  @UseGuards(RestAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  async handler(): Promise<UserOutput[]> {
    const user = await this.findAllUserUsecase.execute();
    return user;
  }
}

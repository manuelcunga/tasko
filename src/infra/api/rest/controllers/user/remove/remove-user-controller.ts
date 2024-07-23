import { Controller, Delete, UseGuards, Param } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/infra/decorator/roles-user.decorator';
import { RestAuthGuard } from 'src/usecases/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/usecases/auth/guards/roles.guard';
import { DeleteUserUsecase } from 'src/usecases/user/delete/delete-user.usecase';

@Controller('/users/:userID')
export class DeleteUserUserController {
  constructor(private readonly deleteUserUsecase: DeleteUserUsecase) {}

  @UseGuards(RestAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(RestAuthGuard)
  @Delete()
  async handler(@Param('userID') userID: string): Promise<void> {
    await this.deleteUserUsecase.execute(userID);
  }
}

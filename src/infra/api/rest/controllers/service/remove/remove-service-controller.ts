import { Controller, Delete, UseGuards, Param } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/infra/decorator/roles-user.decorator';
import { RestAuthGuard } from 'src/usecases/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/usecases/auth/guards/roles.guard';
import { DeleteServiceUsecase } from 'src/usecases/service/delete/delete-service.usecase';

@Controller('/services/:serviceID')
export class DeleteServiceController {
  constructor(private readonly deleteServiceUsecase: DeleteServiceUsecase) {}

  @UseGuards(RestAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  @UseGuards(RestAuthGuard)
  @Delete()
  async handler(@Param('serviceID') serviceID: string): Promise<void> {
    await this.deleteServiceUsecase.execute(serviceID);
  }
}

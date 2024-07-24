import { Controller, Delete, UseGuards, Param } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/infra/decorator/roles-user.decorator';
import { RestAuthGuard } from 'src/usecases/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/usecases/auth/guards/roles.guard';
import { DeleteContractServiceUsecase } from 'src/usecases/contract/delete/delete-contract-service.usecase';

@Controller('/contract-service/:contractServiceID')
export class DeleteContractServiceController {
  constructor(
    private readonly deleteServiceUsecase: DeleteContractServiceUsecase,
  ) {}

  @UseGuards(RestAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @UseGuards(RestAuthGuard)
  @Delete()
  async handler(
    @Param('contractServiceID') contractServiceID: string,
  ): Promise<void> {
    await this.deleteServiceUsecase.execute(contractServiceID);
  }
}

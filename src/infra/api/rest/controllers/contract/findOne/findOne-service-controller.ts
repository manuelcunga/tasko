import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/infra/decorator/roles-user.decorator';
import { RestAuthGuard } from 'src/usecases/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/usecases/auth/guards/roles.guard';
import { ContractOutPut } from 'src/usecases/contract/dtos/contact-output';
import { FindOneContractServiceUsecase } from 'src/usecases/contract/findOne/find-one-contract-service.usecase';

@Controller('/contract-services/:contractServiceID')
export class FindOneContractServiceController {
  constructor(private readonly findOneService: FindOneContractServiceUsecase) {}

  @UseGuards(RestAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Get()
  async handler(
    @Param('contractServiceID') contractServiceID: string,
  ): Promise<ContractOutPut> {
    return this.findOneService.execute(contractServiceID);
  }
}

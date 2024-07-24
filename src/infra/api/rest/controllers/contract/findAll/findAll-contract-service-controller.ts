import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/infra/decorator/roles-user.decorator';
import { RestAuthGuard } from 'src/usecases/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/usecases/auth/guards/roles.guard';
import { ContractOutPut } from 'src/usecases/contract/dtos/contact-output';
import { FindAllContractServiceUsecase } from 'src/usecases/contract/lidtAll/list-all.service-contract';

@Controller('/contract-service')
export class FindAllContractServiceController {
  constructor(private readonly listAlservice: FindAllContractServiceUsecase) {}

  @UseGuards(RestAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Get()
  async handler(): Promise<ContractOutPut[]> {
    return this.listAlservice.execute();
  }
}

import {
  Controller,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/infra/decorator/roles-user.decorator';
import { RestAuthGuard } from 'src/usecases/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/usecases/auth/guards/roles.guard';
import { ContractOutPut } from 'src/usecases/contract/dtos/contact-output';
import { UpdateContractInput } from 'src/usecases/contract/dtos/update-contract-input';
import { UpdateContractServiceUsecase } from 'src/usecases/contract/update/update-contractService.usecase';

@Controller('/contract-services/:contractServiceID')
export class UpdateContractServiceController {
  constructor(
    private readonly updateServiceUsecase: UpdateContractServiceUsecase,
  ) {}

  @UseGuards(RestAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Put()
  @UsePipes(ValidationPipe)
  async handler(
    @Body() serviceInput: UpdateContractInput,
  ): Promise<ContractOutPut> {
    const service = await this.updateServiceUsecase.execute(serviceInput);
    return service;
  }
}

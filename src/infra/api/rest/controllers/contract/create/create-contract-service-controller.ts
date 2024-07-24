import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { UserEntity } from 'src/domain/user/user';
import { CurrentUser } from 'src/infra/decorator/current-user.decorator';
import { Roles } from 'src/infra/decorator/roles-user.decorator';
import { RestAuthGuard } from 'src/usecases/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/usecases/auth/guards/roles.guard';
import { CreateContractServiceUsecase } from 'src/usecases/contract/create/contract-service.usecase';
import { ContractOutPut } from 'src/usecases/contract/dtos/contact-output';
import { CreateContractServiceInput } from 'src/usecases/contract/dtos/contract-service--input';

@Controller('/contract-service/create')
export class CreateContractServiceController {
  constructor(
    private readonly createContractService: CreateContractServiceUsecase,
  ) {}

  @UseGuards(RestAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Post()
  @UsePipes(ValidationPipe)
  async handler(
    @Body() serviceInput: CreateContractServiceInput,
    @CurrentUser() user: UserEntity,
  ): Promise<ContractOutPut> {
    serviceInput.clientId = user.id;
    const service = await this.createContractService.execute(serviceInput);
    return service;
  }
}

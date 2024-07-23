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
import { CreateServiceUsecase } from 'src/usecases/service/create/create-service-usecase';
import { CreateServiceInput } from 'src/usecases/service/dtos/create-service.input';
import { ServiceOutPut } from 'src/usecases/service/dtos/service-output';

@Controller('/services/create')
export class CreateServiceController {
  constructor(private readonly createServiceUsecase: CreateServiceUsecase) {}

  @UseGuards(RestAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  @Post()
  @UsePipes(ValidationPipe)
  async handler(
    @Body() serviceInput: CreateServiceInput,
    @CurrentUser() user: UserEntity,
  ): Promise<ServiceOutPut> {
    serviceInput.providerID = user.id;
    const service = await this.createServiceUsecase.execute(serviceInput);
    return service;
  }
}

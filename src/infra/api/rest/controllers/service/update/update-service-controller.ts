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
import { ServiceOutPut } from 'src/usecases/service/dtos/service-output';
import { UpdateServiceInput } from 'src/usecases/service/dtos/update-service.input ';
import { UpdateServiceUsecase } from 'src/usecases/service/update/update-service.usecase';

@Controller('/services/:serviceID')
export class UpdateServiceController {
  constructor(private readonly updateServiceUsecase: UpdateServiceUsecase) {}

  @UseGuards(RestAuthGuard, RolesGuard)
  @Roles(UserRole.PROVIDER)
  @Put()
  @UsePipes(ValidationPipe)
  async handler(
    @Body() serviceInput: UpdateServiceInput,
  ): Promise<ServiceOutPut> {
    const service = await this.updateServiceUsecase.execute(serviceInput);
    return service;
  }
}

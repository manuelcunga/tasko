import { Controller, Get, Param } from '@nestjs/common';
import { ServiceOutPut } from 'src/usecases/service/dtos/service-output';
import { FindOneServicesecase } from 'src/usecases/service/findOne/find-one-services.usecase';

@Controller('/services/:serviceID')
export class FindOneServiceController {
  constructor(private readonly findOneService: FindOneServicesecase) {}

  @Get()
  async handler(@Param('serviceID') serviceID: string): Promise<ServiceOutPut> {
    return this.findOneService.execute(serviceID);
  }
}

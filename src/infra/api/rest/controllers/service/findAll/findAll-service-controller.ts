import { Controller, Get } from '@nestjs/common';
import { ServiceOutPut } from 'src/usecases/service/dtos/service-output';
import { ListAllServicesUsecase } from 'src/usecases/service/lidtAll/list-all-services.usecase';

@Controller('/services')
export class FindAllServiceController {
  constructor(private readonly listAlservice: ListAllServicesUsecase) {}

  @Get()
  async handler(): Promise<ServiceOutPut[]> {
    return this.listAlservice.execute();
  }
}

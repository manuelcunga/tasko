import { Injectable } from '@nestjs/common';
import { IContractRepository } from 'src/domain/repository/contracts/IContract-repository';
import { messages } from 'src/shared/utils/errors-messages';

@Injectable()
export class FindOneContractServiceUsecase {
  constructor(private contractServiceRepo: IContractRepository) {}

  async execute(id: string) {
    try {
      const contractService = await this.contractServiceRepo.findById(id);

      return contractService;
    } catch (error) {
      throw new Error(messages.InternalServerError);
    }
  }
}

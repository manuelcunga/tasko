import { Injectable } from '@nestjs/common';
import { IContractRepository } from 'src/domain/repository/contracts/IContract-repository';
import { messages } from 'src/shared/utils/errors-messages';

@Injectable()
export class FindAllContractServiceUsecase {
  constructor(private contractServiceRepo: IContractRepository) {}

  async execute() {
    try {
      return this.contractServiceRepo.findAll();
    } catch (error) {
      throw new Error(messages.InternalServerError);
    }
  }
}

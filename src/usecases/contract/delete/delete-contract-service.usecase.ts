import { Injectable, NotFoundException } from '@nestjs/common';
import { IContractRepository } from 'src/domain/repository/contracts/IContract-repository';
import { messages } from 'src/shared/utils/errors-messages';

@Injectable()
export class DeleteContractServiceUsecase {
  constructor(private readonly contractRepo: IContractRepository) {}

  async execute(contractID: string) {
    try {
      const contractService = await this.contractRepo.findById(contractID);
      if (!contractService) {
        throw new NotFoundException(messages.contractNotFound);
      }
      return this.contractRepo.remove(contractID);
    } catch (error) {
      throw new Error(messages.InternalServerError);
    }
  }
}

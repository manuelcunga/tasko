import { Injectable } from '@nestjs/common';
import { ITransitionRepository } from 'src/domain/repository/transition/ITransition-repository';
import { TransitionOutPut } from '../dtos/transition-output';

@Injectable()
export class ListAllTransactionHistoryUsecase {
  constructor(private transactionRepo: ITransitionRepository) {}

  async execute(): Promise<TransitionOutPut[]> {
    const transactionHistory = await this.transactionRepo.findAll();
    return transactionHistory;
  }
}

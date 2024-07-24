import { Injectable } from '@nestjs/common';
import { ITransitionRepository } from 'src/domain/repository/transition/ITransition-repository';
import { TransitionOutPut } from '../dtos/transition-output';

@Injectable()
export class GetAllTransactionUserHistoryUsecase {
  constructor(private transactionRepo: ITransitionRepository) {}

  async execute(userID: string): Promise<TransitionOutPut[]> {
    const transactionHistory =
      await this.transactionRepo.findAllByUserID(userID);
    return transactionHistory;
  }
}

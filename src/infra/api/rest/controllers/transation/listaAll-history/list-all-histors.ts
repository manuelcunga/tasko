import { Controller, Get, UseGuards } from '@nestjs/common';
import { RestAuthGuard } from 'src/usecases/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/usecases/auth/guards/roles.guard';
import { TransitionOutPut } from 'src/usecases/transition/dtos/transition-output';
import { ListAllTransactionHistoryUsecase } from 'src/usecases/transition/list-history/transation-history.usecase';

@Controller('/transaction-history')
export class ListAllTrasanctionHistoryController {
  constructor(
    private readonly listAllHistory: ListAllTransactionHistoryUsecase,
  ) {}

  @UseGuards(RestAuthGuard, RolesGuard)
  @Get()
  async handler(): Promise<TransitionOutPut[]> {
    const tranctationHistory = await this.listAllHistory.execute();
    return tranctationHistory;
  }
}

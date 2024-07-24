import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { UserEntity } from 'src/domain/user/user';
import { CurrentUser } from 'src/infra/decorator/current-user.decorator';
import { Roles } from 'src/infra/decorator/roles-user.decorator';
import { RestAuthGuard } from 'src/usecases/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/usecases/auth/guards/roles.guard';
import { TransitionOutPut } from 'src/usecases/transition/dtos/transition-output';
import { GetAllTransactionUserHistoryUsecase } from 'src/usecases/transition/find-TransactionUser-history/findtransactionByUserID-history';

@Controller('/transaction-user-history')
export class ListAllUserTransactionHistoryController {
  constructor(
    private readonly listAllHistory: GetAllTransactionUserHistoryUsecase,
  ) {}

  @UseGuards(RestAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Get()
  async handler(@CurrentUser() user: UserEntity): Promise<TransitionOutPut[]> {
    const userHistory = await this.listAllHistory.execute(user.id);
    return userHistory;
  }
}

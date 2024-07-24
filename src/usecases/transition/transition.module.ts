import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/infra/database/prisma/prisma.module';

import { ITransitionRepository } from 'src/domain/repository/transition/ITransition-repository';
import { PrismaTransactionRepository } from 'src/infra/database/repository/prisma-transaction-repository ';
import { ListAllTransactionHistoryUsecase } from './list-history/transation-history.usecase';
import { GetAllTransactionUserHistoryUsecase } from './find-TransactionUser-history/findtransactionByUserID-history';
import { ListAllTrasanctionHistoryController } from 'src/infra/api/rest/controllers/transation/listaAll-history/list-all-histors';
import { ListAllUserTransactionHistoryController } from 'src/infra/api/rest/controllers/transation/listAll-user-transaction-history/list-all-user-transaction-histors';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: ITransitionRepository,
      useClass: PrismaTransactionRepository,
    },

    GetAllTransactionUserHistoryUsecase,
    ListAllTransactionHistoryUsecase,
  ],

  controllers: [
    ListAllTrasanctionHistoryController,
    ListAllUserTransactionHistoryController,
  ],
})
export class TransactionModule {}

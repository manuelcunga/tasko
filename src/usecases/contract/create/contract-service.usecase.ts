import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IContractRepository } from 'src/domain/repository/contracts/IContract-repository';
import { messages } from 'src/shared/utils/errors-messages';
import { CreateContractServiceInput } from '../dtos/contract-service--input';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { IServiceRepository } from 'src/domain/repository/service/IService-repository';
import { ContractOutPut } from '../dtos/contact-output';
import { IWalletRepository } from 'src/domain/repository/wallet/Iwallet-repository';
import { ITransitionRepository } from 'src/domain/repository/transition/ITransition-repository';
import { ContractStatus, TransactionType } from '@prisma/client';
import { INotificationRepository } from 'src/domain/repository/notification/INotification-repository';

@Injectable()
export class CreateContractServiceUsecase {
  constructor(
    private contractRepo: IContractRepository,
    private userRepo: IUserRepository,
    private serviceRepo: IServiceRepository,
    private walletRepo: IWalletRepository,
    private transactionRepo: ITransitionRepository,
    private notificationRep: INotificationRepository,
  ) {}

  async execute(data: CreateContractServiceInput): Promise<ContractOutPut> {
    const user = await this.userRepo.findByID(data.clientId);

    if (!user) {
      throw new BadRequestException(messages.userNotFound);
    }

    const service = await this.serviceRepo.findByID(data.serviceId);

    if (!service) {
      throw new BadRequestException(messages.serviceNotFound);
    }

    const wallet = await this.walletRepo.findByUserID(data.clientId);

    if (!wallet) {
      throw new NotFoundException(messages.walletNotFound);
    }

    if (wallet.balance < service.price) {
      throw new BadRequestException(messages.insufficientFunds);
    }

    const newClientBalance = wallet.balance - service.price;
    await this.walletRepo.updateBalance(wallet.id, newClientBalance);

    const providerWallet = await this.walletRepo.findByUserID(
      service.providerID,
    );
    const newProviderBalance = providerWallet.balance + service.price;
    await this.walletRepo.updateBalance(providerWallet.id, newProviderBalance);

    const contract = await this.contractRepo.create({
      clientId: data.clientId,
      serviceId: data.serviceId,
      status: ContractStatus.PENDING,
    });

    await this.transactionRepo.create({
      walletID: providerWallet.id,
      amount: -service.price,
      serviceID: service.id,
      type: TransactionType.CREDIT,
      userID: user.id,
    });

    await this.notificationRep.create({
      userID: service.providerID,
      message: `Your service "${service.title}" has been contracted by ${user.name}.`,
      read: false,
    });

    return contract;
  }
}

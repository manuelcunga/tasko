import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { messages } from 'src/shared/utils/errors-messages';
import { IContractRepository } from 'src/domain/repository/contracts/IContract-repository';
import { IServiceRepository } from 'src/domain/repository/service/IService-repository';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { IWalletRepository } from 'src/domain/repository/wallet/Iwallet-repository';
import { ITransitionRepository } from 'src/domain/repository/transition/ITransition-repository';
import { TransactionType } from '@prisma/client';
import { INotificationRepository } from 'src/domain/repository/notification/INotification-repository';
import { UpdateContractInput } from '../dtos/update-contract-input';

@Injectable()
export class UpdateContractServiceUsecase {
  constructor(
    private contractRepo: IContractRepository,
    private serviceRepo: IServiceRepository,
    private userRepo: IUserRepository,
    private walletRepo: IWalletRepository,
    private transactionRepo: ITransitionRepository,
    private notificationRepo: INotificationRepository,
  ) {}

  async execute(updateContractDTO: UpdateContractInput) {
    const contract = await this.contractRepo.findById(updateContractDTO.id);

    if (!contract) {
      throw new NotFoundException(messages.contractNotFound);
    }

    if (
      updateContractDTO.serviceId !== undefined &&
      updateContractDTO.serviceId.trim() !== ''
    ) {
      const service = await this.serviceRepo.findByID(
        updateContractDTO.serviceId,
      );

      if (!service) {
        throw new BadRequestException(messages.serviceNotFound);
      }

      const wallet = await this.walletRepo.findByUserID(contract.clientId);

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
      await this.walletRepo.updateBalance(
        providerWallet.id,
        newProviderBalance,
      );

      await this.transactionRepo.create({
        walletID: providerWallet.id,
        amount: -service.price,
        serviceID: service.id,
        type: TransactionType.CREDIT,
        userID: contract.clientId,
      });

      const notificationMessage = `Your service "${service.title}" has been updated by ${contract.clientId}.`;
      await this.notificationRepo.create({
        message: notificationMessage,
        read: false,
        userID: service.providerID,
      });

      contract.serviceId = updateContractDTO.serviceId;
    }

    if (updateContractDTO.status !== undefined) {
      contract.status = updateContractDTO.status;
    }

    const updatedContract = await this.contractRepo.update(
      contract.id,
      contract,
    );
    return updatedContract;
  }
}

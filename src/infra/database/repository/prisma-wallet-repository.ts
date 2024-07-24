import { IWalletRepository } from 'src/domain/repository/wallet/Iwallet-repository';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateWalletInput } from 'src/usecases/wallet/dtos/create-wallet-input';
import { UpdateWalletInput } from 'src/usecases/wallet/dtos/ipdate-wallet-input';
import { WalletOutPut } from 'src/usecases/wallet/dtos/wallet-output';

@Injectable()
export class PrismaWalletRepository implements IWalletRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateWalletInput): Promise<WalletOutPut> {
    const wallet = await this.prisma.wallet.create({
      data,
    });
    return wallet;
  }
  async findAll(): Promise<WalletOutPut[]> {
    const wallet = await this.prisma.wallet.findMany();
    return wallet;
  }

  async findByID(id: string): Promise<WalletOutPut> {
    const wallet = await this.prisma.wallet.findFirst({
      where: { id: id },
    });
    return wallet;
  }

  async remove({ id }: { id: string }): Promise<void> {
    await this.prisma.wallet.delete({
      where: { id: id },
    });
  }

  async update(
    walletID: string,
    data: UpdateWalletInput,
  ): Promise<WalletOutPut> {
    const wallet = await this.prisma.wallet.update({
      where: { id: walletID },
      data: data,
    });

    return wallet;
  }

  async findByUserID(userID: string): Promise<WalletOutPut> {
    const wallet = await this.prisma.wallet.findFirst({
      where: {
        userID,
      },
    });
    return wallet;
  }

  async updateBalance(walletId: string, newBalance: number): Promise<void> {
    await this.prisma.wallet.update({
      where: { id: walletId },
      data: { balance: newBalance },
    });
  }
}

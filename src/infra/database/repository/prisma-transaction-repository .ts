import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ITransitionRepository } from 'src/domain/repository/transition/ITransition-repository';
import { TransitionOutPut } from 'src/usecases/transition/dtos/transition-output';
import { CreateTransacttionInput } from 'src/usecases/transition/dtos/create-transition.input';

@Injectable()
export class PrismaTransactionRepository implements ITransitionRepository {
  constructor(private prisma: PrismaService) {}

  async create(input: CreateTransacttionInput): Promise<TransitionOutPut> {
    const transation = await this.prisma.transaction.create({
      data: input,
    });

    return transation;
  }
  async findAll(): Promise<TransitionOutPut[]> {
    const transation = await this.prisma.transaction.findMany();
    return transation;
  }
  async findByID(id: string): Promise<TransitionOutPut> {
    const transation = await this.prisma.transaction.findFirst({
      where: { id },
    });
    return transation;
  }

  async remove(transationID: string): Promise<void> {
    await this.prisma.transaction.delete({
      where: { id: transationID },
    });
  }

  async findAllByUserID(id: string): Promise<TransitionOutPut[]> {
    const transaction = await this.prisma.transaction.findMany({
      where: {
        userID: id,
      },
    });

    return transaction;
  }
}

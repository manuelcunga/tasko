import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from 'src/usecases/user/dtos/create-user-input';
import { UpdateUserInput } from 'src/usecases/user/dtos/update-user-input';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { ProfileOutput } from 'src/usecases/user/dtos/profile-output';
import { UserOutput } from 'src/usecases/user/dtos/user-output';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserInput): Promise<UserOutput> {
    const newUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        nif: user.nif,
        phone: user.phone,
      },
    });

    return newUser;
  }
  async findAll(): Promise<UserOutput[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async findByID(id: string): Promise<UserOutput> {
    const user = await this.prisma.user.findFirst({
      where: { id },
      include: {
        address: true,
      },
    });
    return user;
  }
  async findByEmail(email: string): Promise<UserOutput> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    return user;
  }
  async remove(userID: string): Promise<void> {
    await this.prisma.wallet.deleteMany({
      where: { userID: userID },
    });

    await this.prisma.user.delete({
      where: { id: userID },
    });
  }
  async update(userID: string, data: UpdateUserInput): Promise<UserOutput> {
    const user = await this.prisma.user.update({
      where: { id: userID },
      data: {
        name: data.name,
        email: data.email,
        nif: data.nif,
        phone: data.phone,
      },
    });

    return user;
  }

  async profile(userId: string): Promise<ProfileOutput> {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      include: {
        address: true,
      },
    });
    return user;
  }
}

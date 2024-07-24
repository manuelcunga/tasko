import { Contract, ContractStatus } from '@prisma/client';

export class Contracts implements Contract {
  id: string;
  clientId: string;
  serviceId: string;
  status: ContractStatus;
  createdAt: Date;
  updatedAt: Date;
}

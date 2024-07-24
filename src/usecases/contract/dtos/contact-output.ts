import { ContractStatus } from '@prisma/client';

export class ContractOutPut {
  id: string;
  clientId: string;
  serviceId: string;
  status: ContractStatus;
  createdAt: Date;
  updatedAt: Date;
}

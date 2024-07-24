import { ContractStatus } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class UpdateContractInput {
  id?: string;
  clientId: string;

  @IsOptional()
  serviceId: string;

  @IsOptional()
  status: ContractStatus;
}

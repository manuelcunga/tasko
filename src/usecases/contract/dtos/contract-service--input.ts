import { ContractStatus } from '@prisma/client';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateContractServiceInput {
  clientId: string;

  @IsString()
  @IsNotEmpty()
  serviceId: string;

  @IsOptional()
  status: ContractStatus;
}

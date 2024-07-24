import { ContractOutPut } from 'src/usecases/contract/dtos/contact-output';
import { CreateContractServiceInput } from 'src/usecases/contract/dtos/contract-service--input';
import { UpdateContractInput } from 'src/usecases/contract/dtos/update-contract-input';

export abstract class IContractRepository {
  abstract create(data: CreateContractServiceInput): Promise<ContractOutPut>;
  abstract findAll(): Promise<ContractOutPut[]>;
  abstract findById(id: string): Promise<ContractOutPut>;
  abstract remove(id: string): Promise<void>;
  abstract update(
    id: string,
    data: UpdateContractInput,
  ): Promise<ContractOutPut>;
}

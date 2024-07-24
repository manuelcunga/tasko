import { CreateWalletInput } from 'src/usecases/wallet/dtos/create-wallet-input';
import { UpdateWalletInput } from 'src/usecases/wallet/dtos/ipdate-wallet-input';
import { WalletOutPut } from 'src/usecases/wallet/dtos/wallet-output';

export abstract class IWalletRepository {
  abstract create(data: CreateWalletInput): Promise<WalletOutPut>;
  abstract findAll(): Promise<WalletOutPut[]>;
  abstract findByID(id: string): Promise<WalletOutPut>;
  abstract findByUserID(id: string): Promise<WalletOutPut>;
  abstract remove({ id }: { id: string }): Promise<void>;
  abstract update(
    walletID: string,
    data: UpdateWalletInput,
  ): Promise<WalletOutPut>;

  abstract updateBalance(walletId: string, newBalance: number): Promise<void>;
}

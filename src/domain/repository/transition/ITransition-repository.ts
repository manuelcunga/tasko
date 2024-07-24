import { CreateTransacttionInput } from 'src/usecases/transition/dtos/create-transition.input';
import { TransitionOutPut } from 'src/usecases/transition/dtos/transition-output';

export abstract class ITransitionRepository {
  abstract create(data: CreateTransacttionInput): Promise<TransitionOutPut>;
  abstract findAll(): Promise<TransitionOutPut[]>;
  abstract findByID(id: string): Promise<TransitionOutPut>;
  abstract findAllByUserID(id: string): Promise<TransitionOutPut[]>;
  abstract remove(transitionID: string): Promise<void>;
}

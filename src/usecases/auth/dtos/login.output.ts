import { UserOutput } from 'src/usecases/user/dtos/user-output';

export class LoginOutput {
  token: string;
  expiresIn: number;
  user: UserOutput;
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { messages } from 'src/shared/utils/errors-messages';
import { LoginInput } from '../dtos/login.input';
import { LoginOutput } from '../dtos/login.output';
import { UserOutput } from 'src/usecases/user/dtos/user-output';
import { comparePassword } from 'src/shared/utils/utils';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    private readonly userRepo: IUserRepository,
  ) {}

  async validateUser(data: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException(messages.Unauthenticated);
    }

    const isPasswordValid = comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(messages.Unauthenticated);
    }

    const { token, expiresIn } = await this.jwtToken(user);

    return {
      user: user,
      token,
      expiresIn,
    };
  }

  private async jwtToken(
    user: UserOutput,
  ): Promise<{ token: string; expiresIn: number }> {
    const payload = { username: user.name, sub: user.id };
    const expiresIn = 60 * 60 * 24 * 7;
    const token = await this.jwtService.signAsync(payload, { expiresIn });

    return {
      token,
      expiresIn,
    };
  }
}

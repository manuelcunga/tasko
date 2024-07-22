import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserRepository } from 'src/domain/repository/user/IUser-repository';
import { UserEntity } from 'src/domain/user/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepo: IUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: UserEntity['id']; name: string }) {
    const user = await this.userRepo.findByID(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Ups, Você precisa estar logado.');
    }

    return user;
  }
}

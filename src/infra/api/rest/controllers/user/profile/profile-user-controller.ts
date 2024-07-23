import {
  Controller,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UserEntity } from 'src/domain/user/user';
import { CurrentUser } from 'src/infra/decorator/current-user.decorator';
import { RestAuthGuard } from 'src/usecases/auth/guards/jwt-auth.guard';
import { ProfileOutput } from 'src/usecases/user/dtos/profile-output';
import { ProfileUserUsecase } from 'src/usecases/user/profile/user-profile.usecase';

@Controller('/users/profile')
export class ProfileUserController {
  constructor(private readonly profileUserUsecase: ProfileUserUsecase) {}

  @UseGuards(RestAuthGuard)
  @Get()
  @UsePipes(ValidationPipe)
  async handler(@CurrentUser() user: UserEntity): Promise<ProfileOutput> {
    const response = await this.profileUserUsecase.profile(user.id);
    return response;
  }
}

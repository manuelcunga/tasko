import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressEntity } from 'src/domain/address/address';
import { CreateAddressUsecase } from 'src/usecases/address/create/create-address-usecase';
import { CreateAddressInput } from 'src/usecases/address/dtos/create-address.input';

@Controller('/adaddress/create')
export class CreateAddressController {
  constructor(private readonly createAddress: CreateAddressUsecase) {}

  @Post()
  @UsePipes(ValidationPipe)
  async handler(
    @Body() addressInput: CreateAddressInput,
  ): Promise<AddressEntity> {
    const address = await this.createAddress.execute(addressInput);
    return address;
  }
}

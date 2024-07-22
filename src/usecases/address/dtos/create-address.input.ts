import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateAddressInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  country: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  province: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  city: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  district: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  street: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  number: string;

  @Field({ nullable: true })
  @IsOptional()
  fullAddress: string;

  @Field({ nullable: true })
  @IsOptional()
  createdAt: Date;

  @Field({ nullable: true })
  @IsOptional()
  updatedAt: Date;

  @Field({ nullable: true })
  @IsOptional()
  deletedAt: Date;
}

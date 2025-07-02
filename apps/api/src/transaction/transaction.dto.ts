import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  @IsString()
  categoryId: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  transactionDate: Date;

  @IsString()
  type: TransactionType;
}

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}

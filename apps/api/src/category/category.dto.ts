import { IsString } from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreateCategoryDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsString()
  type: TransactionType;
}

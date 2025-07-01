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

export class DeleteCategoryDto {
  @IsString()
  id: string;

  @IsString()
  userId: string;
}

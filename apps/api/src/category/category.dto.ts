import { IsString } from 'class-validator';
import { TransactionType } from '@prisma/client';
import { Category as PrismaCategory } from '@prisma/client';

export class CreateCategoryDto {
  @IsString()
  name: PrismaCategory['name'];

  @IsString()
  type: TransactionType;
}

export class DeleteCategoryDto {
  @IsString()
  id: PrismaCategory['id'];
}

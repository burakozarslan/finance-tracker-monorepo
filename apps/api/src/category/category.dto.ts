import { IsString } from 'class-validator';
import { TransactionType } from '@prisma/client';
import { User as PrismaUser } from '@prisma/client';
import { Category as PrismaCategory } from '@prisma/client';

export class CreateCategoryInputDto {
  @IsString()
  name: PrismaCategory['name'];

  @IsString()
  type: TransactionType;
}

export interface CreateCategoryData extends CreateCategoryInputDto {
  userId: PrismaUser['id'];
}

export class DeleteCategoryInputDto {
  @IsString()
  id: PrismaCategory['id'];
}

export interface DeleteCategoryData extends DeleteCategoryInputDto {
  userId: PrismaUser['id'];
}

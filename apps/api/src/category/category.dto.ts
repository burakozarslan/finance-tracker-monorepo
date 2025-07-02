import { IsString } from 'class-validator';
import { TransactionType } from '@prisma/client';
import { User as PrismaUser } from '@prisma/client';

export class CreateCategoryInputDto {
  @IsString()
  name: string;

  @IsString()
  type: TransactionType;
}

export interface CreateCategoryData extends CreateCategoryInputDto {
  userId: string
}

export class DeleteCategoryInputDto {
  @IsString()
  id: PrismaUser['id'];
}

export interface DeleteCategoryData extends DeleteCategoryInputDto {
  userId: PrismaUser['id'] 
}

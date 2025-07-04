import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import type {
  User as PrismaUser,
  Category as PrismaCategory,
  Transaction as PrismaTransaction,
} from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: PrismaUser['id'], dto: CreateTransactionDto) {
    // Check if category exists
    const category = await this.prismaService.category.findFirst({
      where: {
        id: dto.categoryId,
        userId,
      },
    });
    if (!category) throw new BadRequestException('Category is invalid');

    // Check if transaction types match
    if (category.type !== dto.type)
      throw new BadRequestException('Transaction type is invalid');

    const transaction = await this.prismaService.transaction.create({
      data: {
        ...dto,
        userId,
      },
    });
    return transaction;
  }

  async findManyByUserId(
    userId: PrismaUser['id'],
    categoryName: PrismaCategory['name'],
  ) {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        userId,
        category: {
          // filter by category
          name: categoryName,
        },
      },
    });
    return transactions;
  }

  async findOne(userId: PrismaUser['id'], id: PrismaTransaction['id']) {
    const transaction = await this.prismaService.transaction.findFirstOrThrow({
      where: {
        id,
        userId,
      },
    });
    return transaction;
  }

  // TODO: Do update
  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  delete(userId: PrismaUser['id'], id: PrismaTransaction['id']) {
    const transaction = this.prismaService.transaction.delete({
      where: {
        id,
        userId,
      },
    });
    return transaction;
  }
}

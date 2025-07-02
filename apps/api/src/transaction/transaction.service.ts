import { Injectable } from '@nestjs/common';
import { UpdateTransactionDto, CreateTransactionDto } from './transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import type {
  User as PrismaUser,
  Category as PrismaCategory,
  Transaction as PrismaTransaction,
} from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  async findManyByUserId(userId: PrismaUser['id']) {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        userId,
      },
    });
    return transactions;
  }

  async findManyByCategoryId(categoryId: PrismaCategory['id']) {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        categoryId,
      },
    });
    return transactions;
  }

  async findOne(id: PrismaTransaction['id']) {
    const transaction = await this.prismaService.transaction.findFirstOrThrow({
      where: {
        id,
      },
    });
    return transaction;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: PrismaTransaction['id']) {
    const transaction = this.prismaService.transaction.delete({
      where: {
        id,
      },
    });
    return transaction;
  }
}

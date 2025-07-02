import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { UpdateTransactionDto, CreateTransactionDto } from './transaction.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findManyByUserId(userId: PrismaUser['id']) {
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        userId,
      },
    });
    return transactions;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}

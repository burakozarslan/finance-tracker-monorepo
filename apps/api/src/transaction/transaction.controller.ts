import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { UpdateTransactionDto, CreateTransactionDto } from './transaction.dto';
import { JwtAuthGuard } from 'src/auth/auth.jwt-guard';
import { User } from 'src/user/user.decorator';
import type { User as PrismaUser } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('create')
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @User() user: PrismaUser,
  ) {
    const transaction = await this.transactionService.create(
      user.id,
      createTransactionDto,
    );
    return {
      message: 'Transaction has been created',
      transaction,
    };
  }

  @Get()
  async findManyByUserId(
    @User() user: PrismaUser,
    @Query() query: { category: string },
  ) {
    const transactions = await this.transactionService.findManyByUserId(
      user.id,
      query.category,
    );
    return transactions;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.transactionService.remove(+id);
  }
}

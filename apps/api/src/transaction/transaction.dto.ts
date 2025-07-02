import { PartialType } from '@nestjs/mapped-types';

export class CreateTransactionDto {}

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {}

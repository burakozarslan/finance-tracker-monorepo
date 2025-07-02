import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Request as ExpressRequest } from 'express';
import { User as PrismaUser } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/auth.jwt-guard';
import { User } from 'src/user/user.decorator';
import type { CreateCategoryDto, DeleteCategoryDto } from './category.dto';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findManyByUserId(@Req() req: ExpressRequest, @User() user: PrismaUser) {
    const categories = await this.categoryService.findManyByUserId(user.id);
    return categories;
  }

  @Post('create')
  async create(
    // Omit userId field from input as we obtain it from Express request object
    @Body() dto: CreateCategoryDto,
    @User() user: PrismaUser,
  ) {
    const category = await this.categoryService.create(user.id, dto);
    return {
      message: 'Category successfully created',
      category,
    };
  }

  @Delete('delete')
  async delete(@Body() input: DeleteCategoryDto, @User() user: PrismaUser) {
    const data = { ...input, userId: user.id };
    const category = await this.categoryService.delete(user.id, data);
    return {
      message: `Category has been deleted`,
      category,
    };
  }
}

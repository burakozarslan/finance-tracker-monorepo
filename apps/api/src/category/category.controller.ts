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
import { CreateCategoryDto, DeleteCategoryDto } from './category.dto';
import { User } from 'src/user/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategoriesByUserId(
    @Req() req: ExpressRequest,
    @User() user: PrismaUser
  ) {
    const categories = await this.categoryService.getCategoriesByUserId(user.id);
    return categories;
  }

  @Post('create')
  async createCategory(
    // Omit userId field from input as we obtain it from Express request object
    @Body() input: Omit<CreateCategoryDto, 'userId'>,
    @User() user: PrismaUser,
  ) {
    const dto = { ...input, userId: user.id} as CreateCategoryDto;
    const category = await this.categoryService.createCategory(dto);
    return {
      message: 'Category successfully created',
      category,
    };
  }

  @Delete('delete')
  async deleteCategory(
    @Body() input: Omit<DeleteCategoryDto, 'userId'>,
    @User() user: PrismaUser,
  ) {
    const dto = { ...input, userId: user.id } as DeleteCategoryDto;
    const category = await this.categoryService.deleteCategory(dto);
    return {
      message: `Category has been deleted`,
      category,
    };
  }
}

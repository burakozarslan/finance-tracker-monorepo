import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Request as ExpressRequest } from 'express';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/auth.jwt-guard';
import { CreateCategoryDto } from './category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCategoriesByUserId(@Req() req: ExpressRequest) {
    const { id: userId } = req.user as User;
    const categories = await this.categoryService.getCategoriesByUserId(userId);
    return categories;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCategory(
    // Omit userId field from input as we obtain it from Express request object
    @Body() input: Omit<CreateCategoryDto, 'userId'>,
    @Req() req: ExpressRequest,
  ) {
    const { id: userId } = req.user as User;
    const dto = { ...input, userId };
    const category = await this.categoryService.createCategory(dto);
    return {
      message: 'Category successfully created',
      category,
    };
  }
}

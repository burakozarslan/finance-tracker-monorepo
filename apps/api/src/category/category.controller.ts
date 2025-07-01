import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Request as ExpressRequest } from 'express';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/auth.jwt-guard';

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
}

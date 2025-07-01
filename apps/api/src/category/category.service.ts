import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCategoriesByUserId(userId: User['id']) {
    const categories = await this.prismaService.category.findMany({
      where: {
        userId,
      },
    });
    return categories;
  }
}

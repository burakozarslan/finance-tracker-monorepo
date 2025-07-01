import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, DeleteCategoryDto } from './category.dto';
import { User } from '@prisma/client';

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

  async createCategory(dto: CreateCategoryDto) {
    // TODO: Handle unique constraints somehow
    const category = await this.prismaService.category.create({
      data: {
        name: dto.name,
        type: dto.type,
        userId: dto.userId,
      },
    });
    return category;
  }

  async deleteCategory(dto: DeleteCategoryDto) {
    const category = await this.prismaService.category.delete({
      where: {
        id: dto.id,
        userId: dto.userId,
      },
    });
    return category;
  }
}

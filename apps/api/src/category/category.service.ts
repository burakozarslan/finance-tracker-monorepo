import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateCategoryData, DeleteCategoryData } from './category.dto';
import { User } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByUserId(userId: User['id']) {
    const categories = await this.prismaService.category.findMany({
      where: {
        userId,
      },
    });
    return categories;
  }

  async create(data: CreateCategoryData) {
    // TODO: Handle unique constraints somehow
    const category = await this.prismaService.category.create({
      data: {
        name: data.name,
        type: data.type,
        userId: data.userId,
      },
    });
    return category;
  }

  async delete(data: DeleteCategoryData) {
    const category = await this.prismaService.category.delete({
      where: {
        id: data.id,
        userId: data.userId,
      },
    });
    return category;
  }
}

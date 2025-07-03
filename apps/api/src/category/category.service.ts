import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import type { CreateCategoryDto, DeleteCategoryDto } from './category.dto';
import { User as PrismaUser } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyByUserId(userId: PrismaUser['id']) {
    const categories = await this.prismaService.category.findMany({
      where: {
        userId,
      },
    });
    return categories;
  }

  async create(userId: PrismaUser['id'], dto: CreateCategoryDto) {
    // TODO: Handle unique constraints somehow
    const category = await this.prismaService.category.create({
      data: {
        name: dto.name,
        type: dto.type,
        userId,
      },
    });
    return category;
  }

  async delete(userId: PrismaUser['id'], dto: DeleteCategoryDto) {
    const category = await this.prismaService.category.delete({
      where: {
        id: dto.id,
        userId,
      },
    });
    return category;
  }
}

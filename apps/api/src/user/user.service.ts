import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByEmail(email: User['email']) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return user;
  }
}

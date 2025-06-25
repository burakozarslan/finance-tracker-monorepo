// auth/auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import type { RegisterDto } from './auth.dto';
import { hashPassword } from './auth.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  async registerUserOrThrow(dto: RegisterDto) {
    const existing = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (existing) throw new BadRequestException('This email is already taken');

    const passwordHash = await hashPassword(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        fullName: dto.fullName,
        passwordHash,
      },
    });
    return user;
  }
}

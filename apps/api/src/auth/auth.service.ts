// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { extractUserFields } from './auth.util';
import type { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signToken(user: { id: User['id'] }) {
    const payload = { sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async registerUserOrThrow(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        name: dto.name,
      },
    });
    const userWithStripeCustomerId =
      await this.userService.createCustomerIdWithEmail(user.email);

    return extractUserFields(userWithStripeCustomerId);
  }

  async loginUserOrThrow(dto: LoginDto) {
    const user = await this.userService.getUserWithEmail(dto.email);
    if (!user) throw new UnauthorizedException('User not found');
    if (user.password !== dto.password)
      throw new UnauthorizedException('Invalid credentials');
    return extractUserFields(user);
  }
}

// auth/auth.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import type { LoginDto, RegisterDto } from './auth.dto';
import { hashPassword, comparePassword } from './auth.util';

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

  async loginUserOrThrow(dto: LoginDto) {
    const existing = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        // Select globally excluded passwordHash manually since we need for password comparison
        passwordHash: true,
      },
    });
    if (!existing)
      throw new NotFoundException('User with that email does not exist');
    const isPasswordMatch = await comparePassword(
      dto.password,
      existing.passwordHash,
    );
    if (!isPasswordMatch) throw new UnauthorizedException('Wrong credentials');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...user } = existing;
    return user;
  }
}

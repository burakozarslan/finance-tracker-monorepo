/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { authCookieOptions, authTokenName } from './auth.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    const jwtSecret = process.env.JWT_SECRET_KEY;
    if (!jwtSecret)
      throw new Error(
        'Critical Error: JWT_SECRET_KEY environment variable is not defined.',
      );

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: ExpressRequest): string | null => req.cookies?.auth_token ?? null,
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(req: ExpressRequest, payload: { sub: User['id'] }) {
    const user = await this.userService.getUserById(payload.sub);
    // Check if user account has been removed or suspended
    if (!user || user.createdAt) {
      // Clear cookie
      (req.res as ExpressResponse).clearCookie(
        authTokenName,
        authCookieOptions,
      );
      throw new UnauthorizedException('Operation not permitted');
    }
    return user;
  }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { User as PrismaUser } from '@prisma/client';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: ExpressRequest = ctx.switchToHttp().getRequest();
    return request.user as PrismaUser;
  },
);

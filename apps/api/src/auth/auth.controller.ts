import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { authCookieOptions, authTokenName } from './auth.constant';
import { JwtAuthGuard } from './auth.jwt-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const user = await this.authService.registerUserOrThrow(dto);
    const authToken = await this.authService.signToken({ id: user.id });
    res.cookie(authTokenName, authToken, authCookieOptions);

    return {
      message: 'Successfully registered',
      user,
    };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const user = await this.authService.loginUserOrThrow(dto);
    const authToken = await this.authService.signToken({ id: user.id });
    res.cookie(authTokenName, authToken, authCookieOptions);

    return {
      message: 'Login successful',
      user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('status@')
  status(@Request() req: ExpressRequest) {
    return req.user;
  }
}

import { CookieOptions } from 'express';

export const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
} as CookieOptions;

export const authTokenName = 'auth_token';

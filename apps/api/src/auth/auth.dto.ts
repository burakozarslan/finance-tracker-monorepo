import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class RegisterDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  fullName: string;
}

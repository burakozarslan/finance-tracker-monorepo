import { IsString, Length } from 'class-validator';

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
  @Length(8, 16)
  password: string;

  @IsString()
  fullName: string;
}

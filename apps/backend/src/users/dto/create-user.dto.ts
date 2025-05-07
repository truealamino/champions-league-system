import {UserRole} from '@prisma/client';
import {IsEmail, IsEnum, IsOptional, IsString, MinLength} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

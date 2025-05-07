import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UserRole} from '@prisma/client';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {Roles} from 'src/auth/roles.decorator';
import {RolesGuard} from 'src/auth/roles.guard';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
}

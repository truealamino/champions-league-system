import {Controller, Get, UseGuards} from '@nestjs/common';
import {UserRole} from '@prisma/client';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {Roles} from 'src/auth/roles.decorator';
import {RolesGuard} from 'src/auth/roles.guard';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }
}

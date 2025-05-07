import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {Request} from 'express';
import {UserRole} from '@prisma/client';
import {ROLES_KEY} from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles.length) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as {role: UserRole};
    return requiredRoles.includes(user.role);
  }
}

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);

    if (!roles) return true;

    console.log('request');
    const { user } = context.switchToHttp().getRequest();
    console.log(
      user.realm_access.roles.some(
        (role) => !!roles.find((item) => item === role),
      ),
    );
    console.log('request');

    return user.realm_access.roles.some(
      (role) => !!roles.find((item) => item === role),
    );
  }
}

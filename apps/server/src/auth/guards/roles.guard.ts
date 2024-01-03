import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  // El reflector permite leer la metadata
  constructor(private readonly reflector: Reflector) {}

  // Funcion que permite o prohibe el acceso
  canActivate(context: ExecutionContext): boolean {
    // Extraigo de la metadata el rol requerido
    const requiredRole = this.reflector.getAllAndOverride(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) return true; // Si no hay rol requerido, doy acceso libre

    // Extraigo del Request el usuario actual
    const { user } = context.switchToHttp().getRequest();

    if (user.role === Role.ADMIN) return true; // Si es un admin, tiene acceso

    return user.role === requiredRole;
  }
}

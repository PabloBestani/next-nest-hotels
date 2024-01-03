import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from './roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(role: Role) {
  return applyDecorators(
    Roles(role), // Setea el rol que sera requerido
    UseGuards(AuthGuard, RolesGuard), // Verifican que el usuario este autenticado y que tenga el rol requerido
  );
}

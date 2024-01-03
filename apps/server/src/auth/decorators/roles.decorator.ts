import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from 'src/common/enums/role.enum';

export const ROLE_KEY = 'role';

// Este decorador recibe por arg un role, y lo deja seteado
// en la metadata, para definir cual sera el rol requerido de una ruta
// Es un par ['role', role]
export const Roles = (role: Role): CustomDecorator<string> =>
  SetMetadata(ROLE_KEY, role);

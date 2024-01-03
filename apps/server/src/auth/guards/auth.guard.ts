import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }

  // Funcion que permite o prohibe el acceso
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Extraigo del request, el token del usuario
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) throw new UnauthorizedException();

      // Verifico si pertenece a un usuario autenticado
      const payload = await this.jwtService.verifyAsync(token);

      // Inyecto los datos del usuario en el request
      request['user'] = payload;

      return true;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException();
    }
  }
}

import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ActiveUserInterface } from '../interfaces/active-user.interface';

export const ActiveUser = createParamDecorator(
  (data: null, context: ExecutionContext): ActiveUserInterface => {
    const { user } = context.switchToHttp().getRequest();
    return user;
  },
);

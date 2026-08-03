import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

import type { AuthenticatedUser } from '../../auth/interfaces/jwt-payload.interface';

/**
 * Injects the authenticated user (populated by JwtStrategy) into a handler.
 *
 * @example
 * findMe(@CurrentUser() user: AuthenticatedUser) {}
 * findMe(@CurrentUser('userId') userId: string) {}
 */
export const CurrentUser = createParamDecorator(
  (property: keyof AuthenticatedUser | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user?: AuthenticatedUser }>();
    const user = request.user;

    return property ? user?.[property] : user;
  },
);

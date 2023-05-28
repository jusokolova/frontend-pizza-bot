import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

const validateRequest = (request, table) => {
  if (request.id) {
    return !!table.users.find((user) => user.id === request.id);
  }

  if (request.name) {
    return !!table.users.find((user) => user.name !== request.name);
  }
};

@Injectable()
export class UserExistsGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request, { users: [] });
  }
}

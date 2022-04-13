import {
  ExecutionContext,
  CanActivate,
  Injectable,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  logger: Logger;
  constructor() {
    this.logger = new Logger(AuthGuard.name);
  }

  canActivate(ctx: ExecutionContext):boolean {
    const context = GqlExecutionContext.create(ctx).getContext();
    context.user = this.verifyToken(context.headers['authorization']);
    return true;
  }

  verifyToken(token: string) {
    const jwt = require('jsonwebtoken');
    token = token.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        this.logger.error(err);
        throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
      } else {
        return decoded;
      }
    });
  }
}

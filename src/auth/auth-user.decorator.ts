import * as jwt from 'jsonwebtoken';
import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { TokenPayload } from './auth-token-payload.interface';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((fieldName, ctx: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(ctx);
    const { currentUser } = gqlCtx.getContext();
    if (!currentUser) return null;
    if (fieldName) return currentUser[fieldName];
    return currentUser;
});

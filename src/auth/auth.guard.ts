import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import { GqlContext } from 'src/_common/graphql/graphql-context.type';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const { currentUser } = ctx.getContext() as GqlContext;
        if (!currentUser) throw new BaseHttpException(ErrorCodeEnum.UNAUTHORIZED);
        return true;
    }
}
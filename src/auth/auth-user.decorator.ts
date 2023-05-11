import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((fieldName, ctx: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(ctx);
    console.log('>>>>>>>>>>>>>>>>', gqlCtx.getInfo());
    const { currentUser } = gqlCtx.getContext();
    if (!currentUser) return null;
    if (fieldName) return currentUser[fieldName];
    return currentUser;
});

import * as jwt from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/models/user.model';
import { Repositories } from 'src/_common/database/database.model.repositories';
import { TokenPayload } from './auth-token-payload.interface';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(Repositories.UsersRepository)
        private readonly userRepository: typeof User
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext();
        console.log('>>>>>>>>>>>>>>>>>>>>', request);
        const token = request.header('Authorization').split(' ')[1];
        if (!token) throw new UnauthorizedException('Need Token');
        const { userId } = <TokenPayload>jwt.verify(token, process.env.JWT_SECRET);
        if (!userId) throw new UnauthorizedException(`Invalid token`);
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) throw new UnauthorizedException(`Can't Find User`);
        return true;
    }
}
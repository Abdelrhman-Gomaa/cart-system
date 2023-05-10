import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Inject } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/user/models/user.model';
import { IContextAuthService } from './context-auth.interface';
import { TokenPayload } from '../../auth/auth-token-payload.interface';
import { Repositories } from '../database/database.model.repositories';

@Injectable()
export class ContextAuthService implements IContextAuthService {
  constructor(
    @Inject(Repositories.UsersRepository) private readonly userRepo: typeof User
  ) { }

  getAuthToken(req: Request): string {
    if (req && req.headers && (req.headers.authorization || req.headers.Authorization)) {
      let auth: string;
      if (req.headers.authorization) auth = req.headers.authorization;
      if (req.headers.Authorization) auth = <string>req.headers.Authorization;
      return auth.split(' ')[1];
    }
    return null;
  }

  async getUserFromReqHeaders(req: Request): Promise<User> {
    let token = this.getAuthToken(req);
    if (!token) return null;
    let { userId } = <TokenPayload>jwt.verify(token, process.env.JWT_SECRET);
    const user = await this.userRepo.findOne({ where: { id: userId } });
    return user ? (user.toJSON() as User) : null;
  }

}

import { User } from '../../user/models/user.model';
import { Request } from 'express';

export const IContextAuthServiceToken = 'IContextAuthService';

export interface IContextAuthService {
  getUserFromReqHeaders(req: Request): Promise<User>;
}

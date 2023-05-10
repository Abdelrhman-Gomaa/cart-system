import { Inject, Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { Request } from 'express';
import { join } from 'path';
import { IContextAuthService, IContextAuthServiceToken } from '../context/context-auth.interface';
import { ApolloDriverConfig } from '@nestjs/apollo';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(
    @Inject(IContextAuthServiceToken) private readonly authService: IContextAuthService,
  ) { }

  createGqlOptions(): ApolloDriverConfig {
    return {
      playground: true,
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      cache: 'bounded',
      persistedQueries: false,
      csrfPrevention: true,
      context: async ({ req, extra }) => {
        let currentUser: User;
        if (extra && extra.currentUser) currentUser = extra.currentUser;
        else currentUser = await this.authService.getUserFromReqHeaders(<Request>req);
        return {
          req,
          currentUser,
        };
      },
    };
  }
}

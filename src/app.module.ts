import { Module } from '@nestjs/common';
import { DatabaseModule } from './_common/database/database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { Context, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { MailModule } from './_common/mail/mail.module';
import { NestBullModule } from './_common/bull/bull.module';
import { ProductModule } from './product/product.module';
import { InvoiceModule } from './invoice/invoice.module';
import { CartModule } from './cart/cart.module';
import { Request } from 'express';
import { TokenPayload } from './auth/auth-token-payload.interface';
import { ContextModule } from './_common/context/context.module';
import { GqlConfigService } from './_common/graphql/graphql.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
      // autoSchemaFile: join(process.cwd(), 'schema.gql'),
      // sortSchema: true,
      imports: [ContextModule]
    }),
    DatabaseModule,
    UserModule,
    MailModule,
    NestBullModule,
    ProductModule,
    InvoiceModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

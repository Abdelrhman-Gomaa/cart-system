import { Module } from '@nestjs/common';
import { DatabaseModule } from './_common/database/database.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { MailModule } from './_common/mail/mail.module';
import { NestBullModule } from './_common/bull/bull.module';
import { ProductModule } from './product/product.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
    }),
    DatabaseModule,
    UserModule,
    MailModule,
    NestBullModule,
    ProductModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

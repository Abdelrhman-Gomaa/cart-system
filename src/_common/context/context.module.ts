import { Global, Module } from '@nestjs/common';
import { IContextAuthServiceToken } from './context-auth.interface';
import { ContextAuthService } from './context-auth.service';
import { DatabaseModule } from '../database/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [{ useClass: ContextAuthService, provide: IContextAuthServiceToken }],
  exports: [{ useClass: ContextAuthService, provide: IContextAuthServiceToken }]
})
export class ContextModule {}

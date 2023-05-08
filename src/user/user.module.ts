import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserResolver } from './user.resolver';
import { UserSocialAccountService } from './services/user-social-account.service';
import { UserVerificationCodeService } from './services/user-verification-code.service';
import { DatabaseModule } from 'src/_common/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserService,
    UserSocialAccountService,
    UserVerificationCodeService,
    UserResolver
  ],
  exports: [
    UserService,
    UserSocialAccountService,
    UserVerificationCodeService
  ]
})
export class UserModule { }

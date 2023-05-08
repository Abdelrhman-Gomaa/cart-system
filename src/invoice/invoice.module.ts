import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { InvoiceResolver } from './invoice.resolver';
import { DatabaseModule } from 'src/_common/database/database.module';

@Module({
  imports: [DatabaseModule, UserModule, ProductModule],
  providers: [InvoiceService, InvoiceResolver],
  exports: [InvoiceService]
})
export class InvoiceModule { }

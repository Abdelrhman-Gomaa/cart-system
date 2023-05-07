import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoicesProvider } from './invoices.provider';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { InvoiceResolver } from './invoice.resolver';

@Module({
  imports: [UserModule, ProductModule],
  providers: [InvoiceService, InvoiceResolver, ...InvoicesProvider],
  exports: [InvoiceService, ...InvoicesProvider]
})
export class InvoiceModule { }

import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { DatabaseModule } from 'src/_common/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProductService, ProductResolver],
  exports: [ProductService]
})
export class ProductModule {}

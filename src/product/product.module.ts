import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductsProvider } from './products.provider';
import { ProductResolver } from './product.resolver';

@Module({
  providers: [ProductService, ...ProductsProvider, ProductResolver],
  exports: [ProductService, ...ProductsProvider]
})
export class ProductModule {}

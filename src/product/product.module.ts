import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductsProvider } from './products.provider';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ...ProductsProvider],
  exports: [ProductService, ...ProductsProvider]
})
export class ProductModule {}

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductInput } from './input/create-product.input';
import { UpdateProductInput } from './input/update-product.input';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './models/product.model';

@Resolver(Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) { }

  @Mutation(() => Product)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.createProduct(input);
  }

  @Query(() => [Product])
  findAllProduct() {
    return this.productService.findAllProduct();
  }

  @Query(() => Product)
  findOneProduct(@Args('id') id: string) {
    return this.productService.findOneProduct(id);
  }

  @Mutation(() => Product)
  updateProduct(@Args('input') input: UpdateProductInput) {
    return this.productService.updateProduct(input);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id') id: string) {
    return this.productService.removeProduct(id);
  }
}

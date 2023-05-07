import { Inject, Injectable } from '@nestjs/common';
import { CreateProductInput } from './input/create-product.input';
import { UpdateProductInput } from './input/update-product.input';
import { Product } from './models/product.model';
import { Repositories } from 'src/_common/database/database.model.repositories';

@Injectable()
export class ProductService {
  constructor(
    @Inject(Repositories.ProductsRepository)
    private readonly productRepo: typeof Product,
  ) { }

  async createProduct(input: CreateProductInput) {
    return await this.productRepo.create({ ...input });
  }

  async findAllProduct() {
    return await this.productRepo.findAll();
  }

  async findOneProduct(id: string) {
    return await this.productRepo.findAll({ where: { id } });
  }

  async updateProduct(input: UpdateProductInput) {
    return await this.productRepo.update({ ...input }, { where: { id: input.productId } });
  }

  async removeProduct(id: string) {
    return await this.productRepo.destroy({ where: { id } });
  }
}

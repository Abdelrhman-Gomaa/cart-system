import { Inject, Injectable } from '@nestjs/common';
import { Repositories } from 'src/_common/database/database.model.repositories';
import { Cart } from './model/cart.model';

@Injectable()
export class ProductService {
    constructor(
        @Inject(Repositories.CartsRepository)
        private readonly cartRepo: typeof Cart,
    ) { }
}
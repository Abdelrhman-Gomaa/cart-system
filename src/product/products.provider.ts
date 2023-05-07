import { Repositories } from 'src/_common/database/database.model.repositories';
import { Product } from './models/product.model';

export const ProductsProvider = [
  {
    provide: Repositories.ProductsRepository,
    useValue: Product,
  }
];

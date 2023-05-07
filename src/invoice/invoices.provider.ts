import { Repositories } from 'src/_common/database/database.model.repositories';
import { Invoice } from './models/invoice.model';

export const InvoicesProvider = [
  {
    provide: Repositories.InvoicesRepository,
    useValue: Invoice,
  }
];

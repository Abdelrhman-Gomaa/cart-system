import { registerEnumType } from '@nestjs/graphql';

export enum InvoiceStatusEnum {
    PLACED = 'PLACED',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED'
}
registerEnumType(InvoiceStatusEnum, { name: 'InvoiceStatusEnum' });
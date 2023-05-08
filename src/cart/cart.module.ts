import { Module } from '@nestjs/common';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { DatabaseModule } from 'src/_common/database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [CartResolver, CartService],
    exports: [CartService]
})
export class CartModule { }

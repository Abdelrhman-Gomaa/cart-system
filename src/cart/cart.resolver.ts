import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Cart } from "./model/cart.model";
import { CartService } from "./cart.service";
import { CreateCartInput } from "./input/create-cart.input";
import { UpdateCartItemsInput, UpdateItemsQuantityInput } from './input/update-cart-items.input';
import { CurrentUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(Cart)
export class CartResolver {
    constructor(
        private readonly cartService: CartService,
    ) { }

    @Mutation(() => Cart)
    async addItemToCart(
        @Args('input') input: UpdateCartItemsInput,
        @CurrentUser('id') currentUser?: string
    ) {
        return await this.cartService.addItemToCart(input, currentUser);
    }

    @Mutation(() => Cart)
    async increaseItemQuantity(
        @Args('input') input: UpdateItemsQuantityInput
    ) {
        return await this.cartService.updateItemQuantity(input, 1);
    }

    @Mutation(() => Cart)
    async decreaseItemQuantity(
        @Args('input') input: UpdateItemsQuantityInput
    ) {
        return await this.cartService.updateItemQuantity(input, -1);
    }
}
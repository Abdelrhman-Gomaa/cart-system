import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Cart } from "./model/cart.model";
import { CartService } from "./cart.service";
import { CreateCartInput } from "./input/create-cart.input";
import { UpdateCartItemsInput } from './input/update-cart-items.input';
import { CurrentUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(Cart)
export class CartResolver {
    constructor(
        private readonly cartService: CartService,
    ) { }

    @Mutation(() => Cart)
    async createCart(@Args('input') input: CreateCartInput) {
        return await this.cartService.createCart(input);
    }

    // @UseGuards(AuthGuard)
    @Mutation(() => Cart)
    async updateCartItems(
        @Args('input') input: UpdateCartItemsInput,
        @CurrentUser('id') currentUser: string
    ) {
        return await this.cartService.updateCartItems(input, currentUser);
    }
}
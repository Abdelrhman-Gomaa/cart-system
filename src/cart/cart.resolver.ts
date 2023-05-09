import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Cart } from "./model/cart.model";
import { CartService } from "./cart.service";
import { CreateCartInput } from "./input/create-cart.input";
import { UpdateCartItemsInput } from './input/update-cart-items.input';

@Resolver(Cart)
export class CartResolver {
    constructor(
        private readonly cartService: CartService,
    ) { }

    @Mutation(() => Cart)
    async createCart(@Args('input') input: CreateCartInput) {
        return await this.cartService.createCart(input);
    }

    @Mutation(() => Cart)
    async updateCartItems(@Args('input') input: UpdateCartItemsInput) {
        return await this.cartService.updateCartItems(input);
    }
}
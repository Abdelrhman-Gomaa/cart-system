import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Cart } from "./model/cart.model";
import { CartService } from "./cart.service";
import { CreateCartInput } from "./input/create-cart.input";

@Resolver(Cart)
export class CartResolver {
    constructor(
        private readonly cartService: CartService,
    ) { }

    @Mutation(() => Cart)
    async createCart(@Args('input') input: CreateCartInput) {
        return await this.cartService.createCart(input);
    }
}
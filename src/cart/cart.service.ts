import { Inject, Injectable } from '@nestjs/common';
import { Repositories } from 'src/_common/database/database.model.repositories';
import { Cart } from './model/cart.model';
import { ContextInfoInput, CreateCartInput } from './input/create-cart.input';
import { User } from 'src/user/models/user.model';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import { Product } from 'src/product/models/product.model';
import { UpdateCartItemsInput } from './input/update-cart-items.input';
import { UpdateItemsQuantityInput } from './input/update-item-quantity.input';
import { FindCartByContextInput } from './input/find-cart.input';

@Injectable()
export class CartService {
    constructor(
        @Inject(Repositories.CartsRepository)
        private readonly cartRepo: typeof Cart,
        @Inject(Repositories.UsersRepository)
        private readonly userRepo: typeof User,
        @Inject(Repositories.ProductsRepository)
        private readonly itemRepo: typeof Product,
    ) { }

    async getCart(input: FindCartByContextInput, currentUser?: string) {
        if (!input.contextInfo && !currentUser) throw new BaseHttpException(ErrorCodeEnum.ENTERED_CONTEXT_OR_USER);
        if (currentUser) {
            const cart = await this.cartRepo.findOne({ where: { userId: currentUser } });
            if (!cart) throw new BaseHttpException(ErrorCodeEnum.INVALID_USER_CART);
            return cart;
        } else if (input.contextInfo && !currentUser) {
            const cart = await this.cartRepo.findOne({ where: { contextInfo: input.contextInfo, userId: null } });
            if (!cart) throw new BaseHttpException(ErrorCodeEnum.DEVICE_HAS_ONE_CART);
            return cart;
        }
    }

    async addItemToCart(input: UpdateCartItemsInput, currentUser?: string) {
        let existingCart;
        if (currentUser)
            existingCart = await this.cartRepo.findOne({ where: { userId: currentUser } });
        else if (input.contextInfo && !currentUser)
            existingCart = await this.cartRepo.findOne({ where: { contextInfo: input.contextInfo, userId: null } });
        if (existingCart) {
            if (!input.cartId)
                input.cartId = existingCart.id;
            return await this.updateCartItems(input, currentUser);
        } else return await this.createCart(input, currentUser);
    }

    async updateItemQuantity(input: UpdateItemsQuantityInput, num: number) {
        const existingCart = await this.cartRepo.findOne({ where: { id: input.cartId } });
        if (!existingCart) throw new BaseHttpException(ErrorCodeEnum.INVALID_CART);
        let itemInfo = existingCart.itemInfo.map(item => {
            let price = item.totalUnitPrice / item.quantity;
            if (item.productId === input.productId) {
                item.quantity = input.quantity || item.quantity + num;
            }
            return {
                productId: item.productId,
                title: item.title,
                quantity: item.quantity,
                totalUnitPrice: item.quantity * price
            };
        });
        let finalItem = [];
        itemInfo.map(item => {
            if (item.quantity > 0) finalItem.push(item);
        });
        let price = this.calcTotalPrice(finalItem);
        await this.cartRepo.update({ itemInfo: finalItem, price }, { where: { id: existingCart.id } });
        return await this.cartRepo.findOne({ where: { id: input.cartId } });
    }

    private async createCart(input: CreateCartInput, currentUser?: string) {
        if (!currentUser && !input.contextInfo)
            throw new BaseHttpException(ErrorCodeEnum.CANNOT_CREATE_CART_WITHOUT_CONTEXT_OR_USER);
        if (currentUser) await this.existingUserCart(currentUser);
        else if (input.contextInfo && !currentUser) await this.existingContextCart(input.contextInfo);

        const existingProduct = await this.itemRepo.findOne({ where: { id: input.productId } });
        let existingItem = [];
        if (!existingProduct) throw new BaseHttpException(ErrorCodeEnum.INVALID_PRODUCT);
        else {
            const item = {
                productId: existingProduct.id,
                title: existingProduct.title,
                quantity: input.quantity,
                totalUnitPrice: (input.quantity * existingProduct.price)
            };
            existingItem.push(item);
        }
        let price = this.calcTotalPrice(existingItem);
        return await this.cartRepo.create({
            ...input,
            ItemInfo: existingItem,
            userId: currentUser,
            price
        });
    }

    private async updateCartItems(input: UpdateCartItemsInput, currentUser?: string) {
        const existingCart = await this.cartRepo.findOne({ where: { id: input.cartId, } });
        if (currentUser && existingCart.userId !== currentUser)
            throw new BaseHttpException(ErrorCodeEnum.INVALID_USER_CART);
        if (
            !currentUser &&
            existingCart.contextInfo.agent !== input.contextInfo.agent &&
            existingCart.contextInfo.device !== input.contextInfo.device &&
            existingCart.contextInfo.ip !== input.contextInfo.ip
        )
            throw new BaseHttpException(ErrorCodeEnum.INVALID_CONTEXT_CART);

        let existingItem = existingCart.itemInfo;
        let newItemId = input.productId;
        existingItem.map(item => {
            let price = item.totalUnitPrice / item.quantity;
            if (item.productId === input.productId) {
                item.quantity = item.quantity + input.quantity;
                item.totalUnitPrice = (item.quantity * price);
                newItemId = null;
            }
        });
        if (newItemId) {
            const product = await this.itemRepo.findOne({ where: { id: newItemId } });
            const item = {
                productId: product.id,
                title: product.title,
                quantity: input.quantity,
                totalUnitPrice: (input.quantity * product.price)
            };
            existingItem.push(item);
        }
        let price = this.calcTotalPrice(existingItem);
        await this.cartRepo.update({ ItemInfo: existingItem, price }, { where: { id: input.cartId } });
        return await this.cartRepo.findOne({ where: { id: input.cartId } });
    }

    private async existingUserCart(userId: string) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) throw new BaseHttpException(ErrorCodeEnum.INVALID_USER);
        const cart = await this.cartRepo.findOne({ where: { userId: userId } });
        if (cart) throw new BaseHttpException(ErrorCodeEnum.USER_CANNOT_CREATE_MORE_THAN_ONE_CART);
    }

    private async existingContextCart(contextInfo: ContextInfoInput) {
        if (!contextInfo.agent || !contextInfo.device || !contextInfo.ip)
            throw new BaseHttpException(ErrorCodeEnum.MUST_ENTERED_ALL_CONTEXT_INFO);
        const cart = await this.cartRepo.findOne({ where: { contextInfo, userId: null } });
        if (cart) throw new BaseHttpException(ErrorCodeEnum.DEVICE_HAS_ONE_CART);
    }

    private calcTotalPrice(itemInformation: any) {
        let totalPrice = 0;
        itemInformation?.forEach(item => totalPrice += item.totalUnitPrice);
        return {
            tax: 0,
            totalPrice,
            discountPrice: 0,
            finalPrice: totalPrice
        };
    }
} 
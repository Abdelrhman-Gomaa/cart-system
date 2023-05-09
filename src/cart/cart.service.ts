import { Inject, Injectable } from '@nestjs/common';
import { Repositories } from 'src/_common/database/database.model.repositories';
import { Cart } from './model/cart.model';
import { ContextInfoInput, CreateCartInput } from './input/create-cart.input';
import { User } from 'src/user/models/user.model';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import { Product } from 'src/product/models/product.model';
import { UpdateCartItemsInput } from './input/update-cart-items.input';

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

    async createCart(input: CreateCartInput) {
        if (!input.userId && !input.contextInfo)
            throw new BaseHttpException(ErrorCodeEnum.CANNOT_CREATE_CART_WITHOUT_CONTEXT_OR_USER);
        if (input.userId) await this.existingUserCart(input.userId);
        if (input.contextInfo) await this.existingContextCart(input.contextInfo, input.userId);
        let productIds = [];
        if (input.ItemInfo)
            productIds = input?.ItemInfo.map(product => product.productId);
        const existingProducts = await this.itemRepo.findAll({ where: { id: productIds } });
        if (!existingProducts) throw new BaseHttpException(ErrorCodeEnum.INVALID_PRODUCT);
        let itemMapping = existingProducts?.map(product => {
            return input?.ItemInfo.map(prod => {
                if (product.id === prod.productId)
                    return {
                        productId: product.id,
                        title: product.title,
                        quantity: prod.quantity,
                        totalUnitPrice: (prod.quantity * product.price)
                    };
            });
        });
        let itemInformation = [];
        itemMapping?.map(item => item.map(prod => prod != undefined ? itemInformation.push(prod) : 0));
        let price = this.calcTotalPrice(itemInformation);
        return await this.cartRepo.create({
            ...input,
            ItemInfo: itemInformation,
            userId: input?.userId,
            price
        });
    }

    async updateCartItems(input: UpdateCartItemsInput, currentUser?: string) {
        const existingCart = await this.cartRepo.findOne({ where: { id: input.cartId, } });
        if (input.userId && existingCart.userId !== input.userId)
            throw new BaseHttpException(ErrorCodeEnum.INVALID_USER_CART);
        if (!input.userId && existingCart.contextInfo !== input.contextInfo)
            throw new BaseHttpException(ErrorCodeEnum.INVALID_CONTEXT_CART);

        let existingItem = existingCart.ItemInfo;
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

    private async existingContextCart(contextInfo: ContextInfoInput, userId: string) {
        if (!contextInfo.agent || !contextInfo.device || !contextInfo.ip)
            throw new BaseHttpException(ErrorCodeEnum.MUST_ENTERED_ALL_CONTEXT_INFO);
        const cart = await this.cartRepo.findAll({ where: { contextInfo: contextInfo } });
        cart.map(item => {
            if (item) {
                if (userId && item.userId === userId)
                    throw new BaseHttpException(ErrorCodeEnum.USER_CANNOT_CREATE_MORE_THAN_ONE_CART);
                if (!userId && !item.userId)
                    throw new BaseHttpException(ErrorCodeEnum.DEVICE_HAS_ONE_CART);
            }
        });
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
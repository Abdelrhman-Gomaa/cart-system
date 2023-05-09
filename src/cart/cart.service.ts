import { Inject, Injectable } from '@nestjs/common';
import { Repositories } from 'src/_common/database/database.model.repositories';
import { Cart } from './model/cart.model';
import { CreateCartInput } from './input/create-cart.input';
import { User } from 'src/user/models/user.model';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import { Product } from 'src/product/models/product.model';

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
        if (!input.userId && !input.contextInfo) {
            throw new BaseHttpException(ErrorCodeEnum.CANNOT_CREATE_CART_WITHOUT_CONTEXT_OR_USER);
        }
        if (input.userId) {
            const user = await this.userRepo.findOne({ where: { id: input.userId } });
            if (!user) throw new BaseHttpException(ErrorCodeEnum.INVALID_USER);
            const cart = await this.cartRepo.findOne({ where: { userId: input.userId } });
            if (cart) throw new BaseHttpException(ErrorCodeEnum.USER_CANNOT_CREATE_MORE_THAN_ONE_CART);
        }
        if (input.contextInfo) {
            if (!input.contextInfo.agent || !input.contextInfo.device || !input.contextInfo.ip)
                throw new BaseHttpException(ErrorCodeEnum.MUST_ENTERED_ALL_CONTEXT_INFO);
            const cart = await this.cartRepo.findAll({ where: { contextInfo: input.contextInfo } });
            cart.map(item => {
                if (item) {
                    if (input.userId && item.userId === input.userId)
                        throw new BaseHttpException(ErrorCodeEnum.USER_CANNOT_CREATE_MORE_THAN_ONE_CART);
                    if (!input.userId && !item.userId)
                        throw new BaseHttpException(ErrorCodeEnum.DEVICE_HAS_ONE_CART);
                }
            });
        }
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
        let totalPrice = 0;
        itemInformation?.forEach(item => totalPrice += item.totalUnitPrice);
        return await this.cartRepo.create({
            ...input,
            ItemInfo: itemInformation,
            userId: input?.userId,
            price: {
                tax: 0,
                totalPrice,
                discountPrice: 0,
                finalPrice: totalPrice
            },
        });
    }
}
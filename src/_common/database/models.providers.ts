import { Cart } from "src/cart/model/cart.model";
import { Repositories } from "./database.model.repositories";
import { Invoice } from "src/invoice/models/invoice.model";
import { Product } from "src/product/models/product.model";
import { User } from "src/user/models/user.model";
import { UserSocialAccount } from "src/user/models/user-social-account.model";
import { UserVerificationCode } from "src/user/models/user-verification-code.model";

export const ModelsProvider = [
    {
        provide: Repositories.CartsRepository,
        useValue: Cart,
    },
    {
        provide: Repositories.InvoicesRepository,
        useValue: Invoice,
    },
    {
        provide: Repositories.ProductsRepository,
        useValue: Product,
    },
    {
        provide: Repositories.UsersRepository,
        useValue: User,
    },
    {
        provide: Repositories.UserSocialAccountsRepository,
        useValue: UserSocialAccount,
    },
    {
        provide: Repositories.UserVerificationCodesRepository,
        useValue: UserVerificationCode,
    },
];

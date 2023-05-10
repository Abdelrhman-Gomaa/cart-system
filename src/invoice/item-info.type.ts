import { Field, ObjectType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { DeviceEnum } from 'src/user/user.enum';

@ObjectType()
export class ItemInfoType {
    @Field()
    productId: string;

    @Field()
    title: string;

    @Field()
    @Min(1)
    quantity: number;

    @Field()
    totalUnitPrice: number;
}

@ObjectType()
export class ContextInfoType {
    @Field(() => DeviceEnum)
    device: DeviceEnum;

    @Field()
    ip: string;

    @Field()
    agent: string;
}

@ObjectType()
export class PriceType {
    @Field()
    tax: number;

    @Field()
    totalPrice: number;

    @Field()
    discountPrice: number;

    @Field()
    finalPrice: number;
}
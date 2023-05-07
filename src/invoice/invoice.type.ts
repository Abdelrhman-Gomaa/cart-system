import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class ItemInfoType {
    @Field()
    productId: string;

    @Field()
    title: string;

    @Field()
    quantity: string;

    @Field()
    totalUnitPrice: boolean;
}
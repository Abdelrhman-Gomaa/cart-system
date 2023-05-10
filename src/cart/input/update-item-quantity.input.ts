import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

@InputType()
export class UpdateItemsQuantityInput {
    @Field()
    @IsNotEmpty()
    @IsUUID('4')
    cartId?: string;

    @Field()
    @IsNotEmpty()
    @IsUUID('4')
    productId: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(1)
    quantity: number;
}
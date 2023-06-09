import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { ContextInfoInput } from './create-cart.input';

@InputType()
export class UpdateCartItemsInput {
    @Field({ nullable: true })
    @IsOptional()
    @IsUUID('4')
    cartId?: string;

    @Field()
    @IsNotEmpty()
    @IsUUID('4')
    productId: string;

    @Field()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsOptional()
    @Field(() => ContextInfoInput, { nullable: true })
    contextInfo?: ContextInfoInput;
}

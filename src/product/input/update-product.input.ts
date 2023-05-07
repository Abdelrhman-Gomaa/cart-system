import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateProductInput {
    @IsUUID('4')
    @Field()
    productId: string;

    @IsString()
    @Field()
    title: string;

    @IsString()
    @Field()
    description: string;

    @IsNumber()
    @Field()
    count: number;

    @IsNumber()
    @Field()
    price: number;
 }

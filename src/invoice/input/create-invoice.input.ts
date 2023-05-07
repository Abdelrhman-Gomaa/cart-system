import { ApiProperty } from '@nestjs/swagger';
import { InvoiceStatusEnum } from '../invoice.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class ItemInfoInput {
    @Field()
    productId: string;

    @Field()
    quantity: number;
}

@InputType()
export class CreateInvoiceInput {

    @IsNotEmpty()
    @Field(() => [ItemInfoInput])
    productInfo: ItemInfoInput[];

    @IsNotEmpty()
    @IsEnum(InvoiceStatusEnum)
    @Field(() => InvoiceStatusEnum)
    status: InvoiceStatusEnum;
}

@InputType()
export class UpdateInvoiceInput {
    @IsUUID('4')
    @Field(() => ID)
    invoiceId: string;

    @IsNotEmpty()
    @Field(() => [ItemInfoInput])
    productInfo: ItemInfoInput[];

    @IsNotEmpty()
    @IsEnum(InvoiceStatusEnum)
    @Field(() => InvoiceStatusEnum)
    status: InvoiceStatusEnum;
}
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';
import { ItemInfoInput } from 'src/invoice/input/create-invoice.input';
import { ItemInfoType, ContextInfoType, PriceType } from 'src/invoice/item-info.type';
import { DeviceEnum } from 'src/user/user.enum';

@InputType()
export class ContextInfoInput {
    @IsNotEmpty()
    @Field(() => DeviceEnum, { nullable: false })
    device: DeviceEnum;

    @IsNotEmpty()
    @Field({ nullable: false })
    ip: string;

    @IsNotEmpty()
    @Field({ nullable: false })
    agent: string;
}

@InputType()
export class CreateCartInput {

    @Field()
    @IsNotEmpty()
    @IsUUID('4')
    productId: string;

    @Field()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number;
    
    @IsOptional()
    @Field(() => ContextInfoInput, { nullable: true })
    contextInfo?: ContextInfoInput;
}

import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
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

    @IsOptional()
    @Field(() => [ItemInfoInput], { nullable: true })
    ItemInfo: ItemInfoInput[];

    @IsOptional()
    @IsUUID('4')
    @Field(() => ID, { nullable: true })
    userId: string;

    @IsOptional()
    @Field(() => ContextInfoInput, { nullable: true })
    contextInfo?: ContextInfoInput;
}

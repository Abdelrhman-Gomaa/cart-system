import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';
import { ItemInfoInput } from 'src/invoice/input/create-invoice.input';
import { ItemInfoType, ContextInfoType, PriceType } from 'src/invoice/item-info.type';
import { DeviceEnum } from 'src/user/user.enum';

@InputType()
export class ContextInfoinput {
    @Field(() => DeviceEnum, {nullable: true})
    device: DeviceEnum;

    @Field({nullable: true})
    ip: string;

    @Field({nullable: true})
    agent: string;
}

@InputType()
export class CreateCartInput {

    @IsOptional()
    @Field(() => [ItemInfoInput], {nullable: true})
    ItemInfo: ItemInfoInput[];

    @IsOptional()
    @IsUUID('4')
    @Field(() => ID,{nullable: true})
    userId: string;

    @IsOptional()
    @Field(() => ContextInfoinput, {nullable: true})
    contextInfo?: ContextInfoinput;
}

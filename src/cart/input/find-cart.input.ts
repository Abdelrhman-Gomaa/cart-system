import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';
import { ContextInfoInput } from './create-cart.input';

@InputType()
export class FindCartByContextInput {
    @IsOptional()
    @Field(() => ContextInfoInput, { nullable: true })
    contextInfo?: ContextInfoInput;
}
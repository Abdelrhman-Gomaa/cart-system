import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
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

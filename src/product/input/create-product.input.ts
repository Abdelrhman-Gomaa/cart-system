import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductInput {
    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    description: string;

    @IsNumber()
    @ApiProperty()
    count: number;

    @IsNumber()
    @ApiProperty()
    price: number;
}

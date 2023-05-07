import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryKey, Default, DataType, Column, Model, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
@ObjectType()
export class Product extends Model{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    @Field(() => ID)
    id: string;

    @Column(DataType.STRING)
    @Field()
    title: string;

    @Column(DataType.STRING)
    @Field()
    description: string;

    @Column(DataType.INTEGER)
    @Field()
    count: number;

    @Column(DataType.INTEGER)
    @Field()
    price: number;

    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt: Date;
}

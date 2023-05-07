import { ApiProperty } from '@nestjs/swagger';
import { PrimaryKey, Default, DataType, Column, Model, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export class Product extends Model{
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    @ApiProperty()
    id: string;

    @Column(DataType.STRING)
    @ApiProperty()
    title: string;

    @Column(DataType.STRING)
    @ApiProperty()
    description: string;

    @Column(DataType.INTEGER)
    @ApiProperty()
    count: number;

    @Column(DataType.INTEGER)
    @ApiProperty()
    price: number;

    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt: Date;
  
    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt: Date;
}

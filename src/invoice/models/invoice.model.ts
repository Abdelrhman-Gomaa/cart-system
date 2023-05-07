import { ApiProperty } from '@nestjs/swagger';
import { AllowNull, BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { ItemInfoType } from '../item-info.type';
import { User } from 'src/user/models/user.model';
import { InvoiceStatusEnum } from '../invoice.enum';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Table
@ObjectType()
export class Invoice extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    @Field(() => ID)
    id: string;

    @AllowNull(false)
    @Column({ type: DataType.JSONB })
    @Field(() => [ItemInfoType])
    ItemInfo: ItemInfoType[];

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @AllowNull(false)
    @Column({ type: DataType.ENUM('PLACED', 'DELIVERED', 'CANCELED') })
    @Field(() => InvoiceStatusEnum)
    status: InvoiceStatusEnum;

    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    @Field()
    totalPrice: number;

    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt: Date;

    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt: Date;
}

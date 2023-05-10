import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AllowNull, BelongsTo, Column, CreatedAt, DataType, Default, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { ItemInfoType, ContextInfoType, PriceType } from 'src/invoice/item-info.type';
import { User } from 'src/user/models/user.model';


@Table
@ObjectType()
export class Cart extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({ type: DataType.UUID })
    @Field(() => ID)
    id: string;

    @AllowNull(true)
    @Column({ type: DataType.JSONB })
    @Field(() => [ItemInfoType], { nullable: true })
    itemInfo: ItemInfoType[];

    @AllowNull(true)
    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    userId?: string;

    @BelongsTo(() => User)
    user: User;

    @AllowNull(true)
    @Column({ type: DataType.JSONB })
    @Field(() => ContextInfoType, { nullable: true })
    contextInfo?: ContextInfoType;

    @AllowNull(true)
    @Column({ type: DataType.JSONB })
    @Field(() => PriceType, { nullable: true })
    price?: PriceType;

    @CreatedAt
    @Column({ type: DataType.DATE })
    createdAt: Date;

    @UpdatedAt
    @Column({ type: DataType.DATE })
    updatedAt: Date;
}
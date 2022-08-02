import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";


@Entity('shoppingcart')
class ShoppingCart extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    product_id: number;
}

export {ShoppingCart};
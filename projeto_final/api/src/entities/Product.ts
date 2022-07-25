import { Entity, Column, PrimaryGeneratedColumn, BaseEntity  } from "typeorm";

@Entity('products')
class Product extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    image: string;

    @Column()
    size: string;
}

export {Product};
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity  } from "typeorm";

@Entity('users')
class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    isAdmin: boolean;

    @Column()
    avatar: string;
}

export {User};
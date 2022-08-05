import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity('users')
class User extends BaseEntity{
    @PrimaryColumn()
    id: string;

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
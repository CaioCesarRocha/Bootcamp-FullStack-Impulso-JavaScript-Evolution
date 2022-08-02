import { getRepository, EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { IUser, IRequestUser } from '../services/interfaces/UsersInterface';



@EntityRepository(User)
export class UsersRepository extends Repository<User>{

    async index(): Promise<IUser[]> {
        const users = await getRepository(User)
        .createQueryBuilder("users")
        .getMany()

        return users;
    }


    async showProduct(id: number): Promise<IUser>{
        const user = await getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :id', {id: id})
        .getOne()

        if(!user) throw new Error('No one user finded')
 
        return user;
    }


    async createUser({newUser}: Partial<IRequestUser> ){
        const product = await getRepository(User)
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
            { 
               // id: newUser.id,
                nickname: newUser.nickname, 
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                avatar: newUser.avatar
            },
        ])
        .execute()

        return product; 
    }


    async updateProduct({id, newUser}: IRequestUser ){
        if (newUser.avatar === undefined){
            const product = await getRepository(User)
            .createQueryBuilder()
            .update(User)
            .set({nickname: newUser.nickname, email: newUser.email, isAdmin: newUser.isAdmin})
            .where("id = :id", { id: id })
            .execute()

            return product; 
        }else{
            const product = await getRepository(User)
            .createQueryBuilder()
            .update(User)
            .set({nickname: newUser.nickname, email: newUser.email, isAdmin: newUser.isAdmin, avatar: newUser.avatar})
            .where("id = :id", { id: id })
            .execute()

            return product; 
        }      
    }
    

    async deleteProduct(id: number){
        const user = await getRepository(User)
        .createQueryBuilder('product')
        .delete()
        .from(User)
        .where('id = :id', {id: id})
        .execute()

        if(!user) throw new Error('Cant possible maked a connection')

        return true;
    }
}
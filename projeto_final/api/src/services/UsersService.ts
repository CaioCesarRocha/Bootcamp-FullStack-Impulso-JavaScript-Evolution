import { getCustomRepository} from 'typeorm';
import {IUser, IRequestUser} from '../services/interfaces/UsersInterface';
import { UsersRepository } from '../repository/Users.repository';


class UsersService{
    constructor(private readonly userRepository: UsersRepository) {}

    async index(): Promise<IUser[]>  {
        var users = await this.userRepository.index();
        
        const serializedUsers = users.map(user =>{
            user.avatar = `http://${process.env.MY_IP_LINUX}:5000/uploads/${user.avatar}`
            return {...user}
        })
        
        return serializedUsers; 
    }

    async show(id: number): Promise<IUser>{      
        var user = await this.userRepository.showProduct(id);
        user.avatar = `http://${process.env.MY_IP_LINUX}:5000/uploads/${user.avatar}`
        return user; 
    }



    async create({newUser}: IRequestUser): Promise<boolean>{       
        if(newUser.nickname.length === 0 || newUser.email.length === 0 || newUser.avatar.length === 0) {
            throw new Error('Inform all fields')
        }

        const user = await this.userRepository.createUser({newUser});

        if(!user) throw new Error('Duplicate field or Connection error')

        return true;     
    }

    async update({id, newUser}: IRequestUser){
        if(!id) throw new Error('ID not informed')

        if(newUser.nickname.length === 0 || newUser.email.length === 0) {
            throw new Error('Inform all fields')
        }

        const user = await this.userRepository.updateProduct({id, newUser})

        return user;
    }


    async delete(id: number){
        if(!id) throw new Error('ID not informed')

        const user = await this.userRepository.deleteProduct(id)

        return user;
    }

}

export default new UsersService(getCustomRepository(UsersRepository))
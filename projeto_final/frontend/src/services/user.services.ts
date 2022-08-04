import { User as FirebaseUser } from 'firebase/auth';
import {IUser} from './interfaces/user.interface';
import * as UserRepository from '../repository/user.repository';


export async function getDataUser(email: string): Promise<IUser>{
    const user = await UserRepository.getDataUser(email);
    return user;
}


export async function saveDataUser(user: FirebaseUser): Promise<number>{
    const dataUser = new FormData(); 

    dataUser.append('nickname', user?.displayName || 'Insira um Nickname');
    dataUser.append('email', user?.email || '');
    dataUser.append('isAdmin', false as any);
    dataUser.append('avatar', user?.photoURL || 'add Avatar');
    
    const response = await UserRepository.saveDataUser(dataUser)
    return response;
}
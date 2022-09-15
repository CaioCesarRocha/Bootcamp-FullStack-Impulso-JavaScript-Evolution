import { User as FirebaseUser } from 'firebase/auth';
import UserLogin from './interfaces/userFirebase.interface';
import {IUser} from './interfaces/user.interface';
import {IProduct} from './interfaces/product.interface';
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

export async function updateDataUser(id: string, user: UserLogin, file?: File): Promise<number>{
    const dataUser = new FormData(); 
    dataUser.append('nickname', user?.name || 'Insira um Nickname');
    dataUser.append('email', user?.email || '');
    dataUser.append('isAdmin', user?.isAdmin as any);
    if(file) dataUser.append('avatar', file);
    else dataUser.append('avatar', 'add Avatar')

    const response = await UserRepository.updateDataUser(id, dataUser)
    return response;
}

export async function addProduct(user_id: string, product_id: number,): Promise<number>{
    const newItem = await UserRepository.addProduct(user_id, product_id);
    return newItem;
}

export async function removeProduct(user_id: string, product_id: number,): Promise<boolean>{
    const response = await UserRepository.removeProduct(user_id, product_id);
    return response;
}

export async function getShoppingCart(user_id: string): Promise<IProduct[]>{
    const products = await UserRepository.getShoppingCart(user_id);
    return products;
}



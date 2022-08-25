import api from '../services/Connection/api';
import {IUser} from '../services/interfaces/user.interface';
import { IProduct } from '../services/interfaces/product.interface';


export async function getDataUser(email: string): Promise<IUser>{
    try{
        const user = await api.get(`/users/${email}`);
        return user.data.user
    }catch{
        const response: IUser = {nickname: '',email: '', isAdmin: false, avatar: ''}
        return response;
    }
}


export async function saveDataUser(dataUser: FormData): Promise<number>{
    try{
        const response = await api.post('/users', dataUser); 
        return response.status;
    }catch(err){
        return 400
    } 
}


export async function updateDataUser(id: string, dataUser: FormData): Promise<number>{
    try{
        const response = await api.put(`/users/${id}`, dataUser); 
        return response.status;
    }catch(err){
        return 400
    } 
}



export async function addProduct(user_id: string, product_id: number): Promise<number>{
    try{
        const newItem = {user_id, product_id}
        const response = await api.post(`/shoppingcart`, newItem); 
        return response.status;
    }catch(err){
        return 400
    } 
}

export async function removeProduct(user_id: string, product_id: number): Promise<boolean>{
    try{
        const response = await api.delete(`/shoppingcart/${user_id}/${product_id}`); 
        return response.data.products;
    }catch(err){
        return false
    } 
}



export async function getShoppingCart(user_id: string): Promise<IProduct[]>{
    try{
        const response = await api.get(`/shoppingcart/${user_id}`); 
        return response.data.products
    }catch(err){
        console.log(err)
        const response: IProduct[] = []
        return response;
    } 
}

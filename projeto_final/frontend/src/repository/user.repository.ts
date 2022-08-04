import api from '../services/Connection/api';
import {IUser} from '../services/interfaces/user.interface';


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

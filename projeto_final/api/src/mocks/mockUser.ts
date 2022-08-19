
import {IUser} from '../services/interfaces/UsersInterface'
import { v4 as uuid} from 'uuid';

export const getMockUser = ():IUser =>({
    id: uuid(),
    nickname: 'Testando Silva',
    email: 'testandosilva@gmail.com',
    isAdmin: false, 
    avatar: 'noHave'
})
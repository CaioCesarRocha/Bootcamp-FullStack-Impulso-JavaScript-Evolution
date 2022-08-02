import { getCustomRepository} from 'typeorm';
import {IItem, IRequestItem} from '../services/interfaces/ShoppingCartInterface';
import { IProduct } from './interfaces/ProductsInterface';
import { ShoppingCartRepository } from '../repository/ShoppingCart.repository';



class ShoppingCartService{
    constructor(private readonly shoppingCartRepository: ShoppingCartRepository) {}

    async index(id: number): Promise<IProduct[]>{
        const products = await this.shoppingCartRepository.index(id);

        return products
    }


    async create({newItem}: IRequestItem): Promise<boolean>{

        const user = await this.shoppingCartRepository.createUser({newItem});

        if(!user) throw new Error('Duplicate field or Connection error')

        return true;     
    }
}

export default new ShoppingCartService(getCustomRepository(ShoppingCartRepository))

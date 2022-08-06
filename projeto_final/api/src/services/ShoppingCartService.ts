import { getCustomRepository} from 'typeorm';
import {IItem, IRequestItem} from '../services/interfaces/ShoppingCartInterface';
import { IProduct } from './interfaces/ProductsInterface';
import { ShoppingCartRepository } from '../repository/ShoppingCart.repository';



class ShoppingCartService{
    constructor(private readonly shoppingCartRepository: ShoppingCartRepository) {}

    async index(id: string): Promise<IProduct[]>{
        var products = await this.shoppingCartRepository.index(id);

        const serializedProducts = products.map(product =>{
            product.image = `http://${process.env.MY_IP_LINUX}:5000/uploads/${product.image}`
            return {...product}
        })
        

        return serializedProducts;
    }


    async create({newItem}: IRequestItem): Promise<boolean>{

        const user = await this.shoppingCartRepository.createUser({newItem});

        if(!user) throw new Error('Duplicate field or Connection error')

        return true;     
    }
}

export default new ShoppingCartService(getCustomRepository(ShoppingCartRepository))

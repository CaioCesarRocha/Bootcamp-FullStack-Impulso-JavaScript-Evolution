import { getCustomRepository} from 'typeorm';
import { IRequestItem } from '../services/interfaces/ShoppingCartInterface';
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


    async createUserProduct({newItem}: IRequestItem): Promise<boolean>{

        const user = await this.shoppingCartRepository.createUserProduct({newItem});

        if(!user) throw new Error('Duplicate field or Connection error')

        return true;     
    }

    async deleteUserProduct(user_id: string, product_id: number): Promise<boolean>{
        console.log('dadosService', user_id, product_id)
        const response = await this.shoppingCartRepository.deleteUserProduct(user_id, product_id);

        if(!response) throw new Error('Duplicate field or Connection error')

        return true;     
    }
}

export default new ShoppingCartService(getCustomRepository(ShoppingCartRepository))

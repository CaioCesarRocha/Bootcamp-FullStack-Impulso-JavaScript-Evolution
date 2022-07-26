import { getCustomRepository} from 'typeorm';
import { ProductsRepository} from '../repository/Products.repository'
import {IProduct, IRequestProduct} from '../services/interfaces/ProductsInterface';


class ProductsService{
    constructor(private readonly productRepository: ProductsRepository) {}

    async index(): Promise<IProduct[]>  {
      
        const products = await this.productRepository.index();
        
        return products; 
    }


    async show(id: number): Promise<IProduct>{      
        const products = await this.productRepository.showProduct(id);

        return products; 
    }


    async create({newP}: IRequestProduct ){

        if(newP.name.length === 0 || newP.size.length === 0) {
            throw new Error('Inform all fields')
        }

        const product = await this.productRepository.createProduct({newP});

        if(!product) throw new Error('Duplicate field or Connection error')

        return product;     
    }


    async update({id, newP}: IRequestProduct){
        if(!id) throw new Error('ID not informed')

        if(newP.name.length === 0 || newP.size.length === 0) {
            throw new Error('Inform all fields')
        }

        const product = await this.productRepository.updateProduct({id, newP})

        return product;
    }


    async delete(id: number){
        if(!id) throw new Error('ID not informed')

        const product = await this.productRepository.deleteProduct(id)

        return product;
    }
}

export default new ProductsService(getCustomRepository(ProductsRepository))
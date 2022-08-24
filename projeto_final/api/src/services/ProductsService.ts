import { getCustomRepository} from 'typeorm';
import { ProductsRepository} from '../repository/Products.repository'
import { ShoppingCartRepository} from '../repository/ShoppingCart.repository';
import {IProduct, IRequestProduct} from '../services/interfaces/ProductsInterface';


class ProductsService{
    constructor(private readonly productRepository: ProductsRepository) {}

    async index(): Promise<IProduct[]>  {
        var products = await this.productRepository.index();
        
        const serializedProducts = products.map(product =>{
            product.image = `http://${process.env.MY_IP_LINUX}:5000/uploads/${product.image}`
            return {...product}
        })
        
        return serializedProducts; 
    }


    async show(id: number): Promise<IProduct>{      
        var product = await this.productRepository.showProduct(id);
        product.image = `http://${process.env.MY_IP_LINUX}:5000/uploads/${product.image}`
        return product; 
    }


    async search(search: string): Promise<IProduct[]> {
        var products = await this.productRepository.search(search);
        
        const serializedProducts = products.map(product =>{
            product.image = `http://${process.env.MY_IP_LINUX}:5000/uploads/${product.image}`
            return {...product}
        })
        
        return serializedProducts; 
    }


    async create({newP}: IRequestProduct): Promise<boolean>{
        if(newP.name.length === 0 || newP.size.length === 0) {
            throw new Error('Inform all fields')
        }

        const product = await this.productRepository.createProduct({newP});

        if(!product) throw new Error('Duplicate field or Connection error')

        return true;     
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

        try{
            const shoppingCartRepository = new ShoppingCartRepository();
            await shoppingCartRepository.deleteProduct(id)
            
            const product = await this.productRepository.deleteProduct(id);
            return product;
        }catch{
            const product = await this.productRepository.deleteProduct(id)
            return product;
        }      
    }
}

export default new ProductsService(getCustomRepository(ProductsRepository))
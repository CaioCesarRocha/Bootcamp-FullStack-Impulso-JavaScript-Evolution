import { getRepository, EntityRepository, Repository } from 'typeorm';
import { ShoppingCart } from '../entities/ShoppingCart';
import { Product } from '../entities/Product';
import { IProduct } from '../services/interfaces/ProductsInterface';
import { ProductsRepository } from './Products.repository';
import { IItem, IRequestItem } from '../services/interfaces/ShoppingCartInterface';
import { productsRoutes } from '../Routes/products.routes';
import { getModeForResolutionAtIndex } from 'typescript';



@EntityRepository(ShoppingCart)
export class ShoppingCartRepository extends Repository<ShoppingCart>{
    
    async index(id: number): Promise<IProduct[]>{
        const idsItems = await getRepository(ShoppingCart)
        .createQueryBuilder('item')
        .where('item.user_id = :id', {id: id})
        .getMany();
        
        const productsRepository = new ProductsRepository();
        var Products: IProduct[] = [];
        for(var i=0; i<idsItems.length; i++){
            const Product = await productsRepository.showProduct(idsItems[i].product_id);
            Products.push(Product)
        }

        return Products;      
    }



    async createUser({newItem}: Partial<IRequestItem> ){
        const product = await getRepository(ShoppingCart)
        .createQueryBuilder()
        .insert()
        .into(ShoppingCart)
        .values([
            { 
               user_id: newItem.user_id,
               product_id: newItem.product_id
            },
        ])
        .execute()

        return product; 
    }
}
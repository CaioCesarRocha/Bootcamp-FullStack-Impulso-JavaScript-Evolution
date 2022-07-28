import { getRepository, EntityRepository, Repository } from 'typeorm';
import { Product } from '../entities/Product';
import {IProduct, IRequestProduct} from '../services/interfaces/ProductsInterface';


@EntityRepository(Product)
export class ProductsRepository extends Repository<Product>{

    async index(): Promise<IProduct[]> {
        const products = await getRepository(Product)
        .createQueryBuilder("product")
        .getMany()

        return products;
    }


    async showProduct(id: number): Promise<IProduct>{
        console.log('id enviado', id, 'tipo', typeof id)
        const product = await getRepository(Product)
        .createQueryBuilder('product')
        .where('product.id = :id', {id: id})
        .getOne()

        if(!product) throw new Error('No one product finded')
        console.log('produto', product)
        return product;
    }


    async createProduct({newP}: Partial<IRequestProduct> ){
        const product = await getRepository(Product)
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values([
            { 
                name: newP.name, 
                price: newP.price,
                quantity: newP.quantity,
                image: newP.image,
                size: newP.size
            },
        ])
        .execute()

        return product; 
    }

    async updateProduct({id, newP}: IRequestProduct ){
        const product = await getRepository(Product)
        .createQueryBuilder()
        .update(Product)
        .set({name: newP.name, price: newP.price, quantity: newP.quantity, image: newP.image, size: newP.size})
        .where("id = :id", { id: id })
        .execute()

        return true; 
    }

    async deleteProduct(id: number){
        const product = await getRepository(Product)
        .createQueryBuilder('product')
        .delete()
        .from(Product)
        .where('id = :id', {id: id})
        .execute()

        if(!product) throw new Error('Cant possible maked a connection')

        return true;
    }
}

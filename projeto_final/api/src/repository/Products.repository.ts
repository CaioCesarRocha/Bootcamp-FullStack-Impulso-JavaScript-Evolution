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
        const product = await getRepository(Product)
        .createQueryBuilder('product')
        .where('product.id = :id', {id: id})
        .getOne()

        if(!product) throw new Error('No one product finded')
        return product;
    }

    
    //LEMBRAR FAZER FILTRO PARA PREÇOS, AQUI TA PROCURANDO SOMENTE PELO NOME E TAMANHO.
    async search(search: string): Promise<IProduct[]>{
        console.log('searc', search)
        const products = await getRepository(Product)
        .createQueryBuilder("product")
        .where('product.name = :name', {name: `${search}`})      
        .orWhere('product.size like :size', {size: `${search}`})
        .getMany()
        
        return products;
    }


    async createProduct({newProduct}: Partial<IRequestProduct> ){
        const product = await getRepository(Product)
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values([{ 
            name: newProduct.name, 
            price: newProduct.price,
            quantity: newProduct.quantity,
            image: newProduct.image,
            size: newProduct.size
        },])
        .execute()
        return product; 
    }

    async updateProduct({id, newProduct}: IRequestProduct ){
        if (newProduct.image === undefined){
            const product = await getRepository(Product)
            .createQueryBuilder()
            .update(Product)
            .set({
                name: newProduct.name, 
                price: newProduct.price, 
                quantity: newProduct.quantity, 
                size: newProduct.size})
            .where("id = :id", { id: id })
            .execute()

            return product; 
        }
        const product = await getRepository(Product)
        .createQueryBuilder()
        .update(Product)
        .set({
            name: newProduct.name, 
            price: newProduct.price, 
            quantity: newProduct.quantity, 
            image: newProduct.image, 
            size: newProduct.size
        })
        .where("id = :id", { id: id })
        .execute()

        return product;      
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

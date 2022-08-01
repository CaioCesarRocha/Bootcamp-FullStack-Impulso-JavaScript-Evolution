import api from '../services/Connection/api';
import { IProduct } from '../services/interfaces/product.interface'


export async function getAllProducts(): Promise<IProduct[]> {  
    try{
        const response = await api.get('/products');       
        return response.data.products;
    }catch(err){
        console.log(err)
        const response: IProduct[] = []
        return response;
    }
}


export async function getOneProduct(id: string): Promise<IProduct>{
    try{
        const response = await api.get(`/products/${id}`)
        return response.data.product;
    }catch(err){
        console.log(err)
        const response: IProduct = {id: 0, name: '', price: 0, quantity: 0, size: '', image: ''}
        return response;
    }
}


export async function getSearchProducts(search: string): Promise<IProduct[]> { 
    try{
        const response = await api.get(`/products/filter/${search}`);
        return response.data.products;
    }catch(err){
        console.log(err)
        const response: IProduct[] = []
        return response;
    }
}


export async function createProduct(dataProduct: FormData): Promise<number>{
    try{
        const response = await api.post('/products', dataProduct); 
        return response.status;
    }catch(err){
        return 400
    } 
}


export async function updateProduct(id: string, dataProduct: FormData): Promise<number>{
    try{
        const response = await api.put(`/products/${id}`, dataProduct); 
        return response.status;
    }catch(err){
        return 400
    } 
}
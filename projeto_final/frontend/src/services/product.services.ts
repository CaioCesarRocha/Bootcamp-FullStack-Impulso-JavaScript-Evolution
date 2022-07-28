
import * as validationForm from './validationForm';
import * as ProductRepository from '../repository/product.repository';
import {IProduct} from '../services/interfaces/product.interface'


export async function getAllProducts(): Promise<IProduct[]>{
    const response = await ProductRepository.getAllProducts();
    
    return response;    
}


export async function getOneProduct(id: string): Promise<IProduct>{
    const response = await ProductRepository.getOneProduct(id);

    return response;
}



export async function createProduct(data: validationForm.FormValuesCreateProduct, file: File): Promise<number>{
    const dataProduct = new FormData(); 

    dataProduct.append('name', data.name);
    dataProduct.append('price', data.price);
    dataProduct.append('quantity', data.quantity);
    dataProduct.append('size', data.size);

    if(file){
        dataProduct.append('image', file)
    }

    const response = await ProductRepository.createProduct(dataProduct)
    return response;
}
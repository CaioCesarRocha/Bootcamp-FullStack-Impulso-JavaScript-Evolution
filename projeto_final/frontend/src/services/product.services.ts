import * as ProductRepository from '../repository/product.repository';
import { FormValuesCreateProduct, FormValuesProduct,IProduct} from '../services/interfaces/product.interface'


export async function getAllProducts(): Promise<IProduct[]>{
    const response = await ProductRepository.getAllProducts();
    
    return response;    
}


export async function getOneProduct(id: string): Promise<IProduct>{
    const response = await ProductRepository.getOneProduct(id);

    return response;
}



export async function createProduct(data: FormValuesCreateProduct, file: File): Promise<number>{
    const dataProduct = new FormData(); 

    dataProduct.append('name', data.name);
    dataProduct.append('price', data.price);
    dataProduct.append('quantity', data.quantity);
    dataProduct.append('size', data.size);

    if(file) dataProduct.append('image', file)

    const response = await ProductRepository.createProduct(dataProduct)
    return response;
}

export async function updateProduct( id:string,data: FormValuesProduct, file?: File): Promise<number>{
    const dataProduct = new FormData(); 

    dataProduct.append('name', data.name);
    dataProduct.append('price', data.price as any);
    dataProduct.append('quantity', data.quantity as any);
    dataProduct.append('size', data.size);

    if(file) dataProduct.append('image', file)
    else dataProduct.append('image', '')

    const response = await ProductRepository.updateProduct(id, dataProduct)
    return response;
}
import * as Yup from "yup";
import * as  ProductService from '../services/product.services';
import {FormValuesProduct, FormValuesCreateProduct, IProduct} from './interfaces/product.interface';

//VALIDATION FOR CREATE
export const schemaCreateProduct = Yup.object().shape({ //validation com Yup
    name: Yup.string().required('O campo Nome é obrigatório'),
    price: Yup.number().required('O campo Preço é obrigatório'),
    quantity: Yup.number().required('O campo Quantidade é obrigatório'),
    size: Yup.string().required('Selectione um tamanho'),
})

export const initialValuesCreateProduct: FormValuesCreateProduct = { 
    name: '', price: '', quantity: '', size: '' 
};

export const sizes = ['P', 'M', 'G', 'GG'];




//VALIDATION FOR UPDATE
export const getInitialValues = async (id: string) =>{
    const values: IProduct = await ProductService.getOneProduct(id);

    const ValuesUpdateProduct:FormValuesProduct = { 
        id: values.id,
        name: values.name, 
        price: values.price, 
        quantity: values.quantity, 
        size: values.size,
        image: values.image 
    };

    return ValuesUpdateProduct
}





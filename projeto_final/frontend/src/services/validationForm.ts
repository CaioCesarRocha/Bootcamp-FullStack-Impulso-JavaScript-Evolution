import * as Yup from "yup";

//VALIDATION TO FORM CREATE PRODUCT
export const schemaCreateProduct = Yup.object().shape({ //validation com Yup
    name: Yup.string().required('O campo Nome é obrigatório'),
    price: Yup.number().required('O campo Preço é obrigatório'),
    quantity: Yup.number().required('O campo Quantidade é obrigatório'),
    size: Yup.string().required('Selectione um tamanho'),
})

export interface FormValuesCreateProduct { //necessário para o formik
    name: string;
    price: string;
    quantity: string;
    size: string;
}

export const initialValuesCreateProduct: FormValuesCreateProduct = { 
    name: '', price: '', quantity: '', size: '' 
};

export const sizes = ['P', 'M', 'G', 'GG']

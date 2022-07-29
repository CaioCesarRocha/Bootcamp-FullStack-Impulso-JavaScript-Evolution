export interface FormValuesProduct {
    id?: number;
    name: string;
    price: string | number;
    quantity: string | number;
    size: string;
    image?: string;
}


export interface FormValuesCreateProduct {
    id?: number;
    name: string;
    price: string;
    quantity: string;
    size: string;
    image?: string;
}


export interface IProduct{
    id: number;
    name: string;
    price: number;
    quantity: number;
    size: string;
    image: string;  
}


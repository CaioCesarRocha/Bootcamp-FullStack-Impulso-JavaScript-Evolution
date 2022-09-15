export interface IProduct{
    name: string,
    price: number,
    quantity: number,
    image: string,
    size: string
}

export interface IRequestProduct{
    id?: number,
    newProduct: IProduct
}
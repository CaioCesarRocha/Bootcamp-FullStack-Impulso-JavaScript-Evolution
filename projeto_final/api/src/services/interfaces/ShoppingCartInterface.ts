export interface IItem{
    id?:number;
    user_id: string;
    product_id: number;
}

export interface IRequestItem{
    id?: number,
    newItem: IItem
}
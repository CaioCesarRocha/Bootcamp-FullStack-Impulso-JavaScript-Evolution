import { NextFunction, Request, Response} from 'express';
import ShoppingCartService from '../services/ShoppingCartService';



class ShoppingCartController {
    constructor(private readonly shoppingCartService: typeof ShoppingCartService) {}


    public index = async(request: Request, response: Response, next: NextFunction) =>{
        const id = request.params.id
        try{
            const products = await this.shoppingCartService.index(id);
    
            return response.status(200).json({products}) 
        }catch(error){
            error.message="Connection refused"
            next(error)
        }
    }


    public create = async(request: Request, response: Response, next: NextFunction) =>{
        try{
            var newItem = request.body
   
            const item = await this.shoppingCartService.createUserProduct({newItem});
    
            return response.status(201).json({item})
        }catch(error){
            error.statusCode = 400;
            error.message = 'Data miss a field or Duplicate Field or connection refused'
            next(error)
        }  
    }


    public delete = async(request: Request, response: Response, next: NextFunction) =>{

        const user_id = request.params.user_id
        const product_id = parseInt(request.params.product_id)

        try{
            const products = await this.shoppingCartService.deleteUserProduct(user_id, product_id);
    
            return response.status(200).json({products}) 
        }catch(error){
            error.message="Connection refused"
            next(error)
        }
    }
}



export default new ShoppingCartController(ShoppingCartService)
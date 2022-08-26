import { NextFunction, Request, Response} from 'express';
import ProductsService from '../services/ProductsService';


class ProductsController {
    constructor(private readonly productService: typeof ProductsService) {}


    public index = async(request: Request, response: Response, next: NextFunction) =>{
        try{
            const products = await this.productService.index();

            return response.status(200).json({products}) 
        }catch(error){
            error.message="Connection refused"
            next(error)
        }
    }


    public show = async(request: Request, response: Response, next: NextFunction) => { 
        const id: number = parseInt(request.params.id) 
        try{
            const product = await this.productService.show(id);
    
            return response.status(200).json({product}) 
        }catch(error){
            error.statusCode = 400;
            error.message=`Product id(${id}) don't exist or connection refused`
            next(error)
        }     
    }


    public search = async(request: Request, response: Response, next: NextFunction) => { 
        try{
            const products = await this.productService.search(request.params.search );
    
            return response.status(200).json({products}) 
        }catch(error){
            error.statusCode = 400;
            error.message=`Product don't exist or connection refused`
            next(error)
        }     
    }


    public create = async(request: Request, response: Response, next: NextFunction) =>{
        try{
            const imgProduct = request.file?.filename

            var newP = request.body
            newP = {...newP, "image": imgProduct || 'noHas'}

            const product = await this.productService.create({newP});
    
            return response.status(201).json({product})
        }catch(error){
            error.statusCode = 400;
            error.message = 'Data miss a field or Duplicate Field or connection refused'
            next(error)
        }  
    }


    public update = async(request: Request, response: Response, next: NextFunction) => {
        try{
            const imgProduct = request.file?.filename;
            var newP = request.body;
            newP = {...newP, "image": imgProduct};   

            const id = parseInt(request.params.id)

            const product = await this.productService.update({id, newP});

            return response.status(200).json({product})
        }catch(error){
            error.statusCode = 400;
            error.message = 'Data miss a field or Duplicate Field or connection refused'
            next(error)
        }   
    }


    public delete = async(request: Request, response: Response, next: NextFunction) =>{
        const id = parseInt(request.params.id) 

        try{
            const product = await this.productService.delete(id);
            return response.status(200).json({product});
        }catch(error){
            next(error)
        }
    }
}


export default new ProductsController(ProductsService)
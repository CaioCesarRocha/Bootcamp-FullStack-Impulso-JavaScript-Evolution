import { NextFunction, Request, Response} from 'express';
import UsersService from '../services/UsersService';



class UsersController {
    constructor(private readonly userService: typeof UsersService) {}

    public index = async(request: Request, response: Response, next: NextFunction) =>{
        try{
            const users = await this.userService.index();

            return response.status(200).json({users}) 
        }catch(error){
            error.message="Connection refused"
            next(error)
        }
    }


    public show = async(request: Request, response: Response, next: NextFunction) => { 
        const id: number = parseInt(request.params.id) 
        try{
            const user = await this.userService.show(id);
    
            return response.status(200).json({user}) 
        }catch(error){
            error.statusCode = 400;
            error.message=`User with id(${id}) don't exist or connection refused`
            next(error)
        }     
    }


    public create = async(request: Request, response: Response, next: NextFunction) =>{
        try{
            const imgAvatar = request.file?.filename

            var newUser = request.body
            newUser = {...newUser, "avatar": imgAvatar}
   
            const user = await this.userService.create({newUser});
    
            return response.status(201).json({user})
        }catch(error){
            error.statusCode = 400;
            error.message = 'Data miss a field or Duplicate Field or connection refused'
            next(error)
        }  
    }


    public update = async(request: Request, response: Response, next: NextFunction) => {
        try{
            const imgAvatar = request.file?.filename;
            var newUser = request.body;
            newUser = {...newUser, "avatar": imgAvatar};   

            const id = parseInt(request.params.id)

            const user = await this.userService.update({id, newUser});

            return response.status(200).json({user})
        }catch(error){
            error.statusCode = 400;
            error.message = 'Data miss a field or Duplicate Field or connection refused'
            next(error)
        }   
    }


    public delete = async(request: Request, response: Response, next: NextFunction) =>{
        const id = parseInt(request.params.id) 

        try{
            const user = await this.userService.delete(id);
            return response.status(200).json({user});
        }catch(error){
            next(error)
        }
    }
}


export default new UsersController(UsersService)
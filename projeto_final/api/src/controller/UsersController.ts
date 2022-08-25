import { NextFunction, Request, Response} from 'express';
import {UsersService} from '../services/UsersService';
import { UsersRepository } from '../repository/Users.repository';
import { database } from '../database/data_test';


export class UsersController {
    //constructor(private readonly userService: typeof UsersService) {}

    public index = async(request: Request, response: Response, next: NextFunction) =>{
        //teste return response.status(200).json(database) 
        const userService = await new UsersService({userRepository: new UsersRepository})
        try{
            const users = await userService.index();

            return response.status(200).json(users) 
        }catch(error){
            error.message="Connection refused"
            next(error)
        }
    }


    public show = async(request: Request, response: Response, next: NextFunction) => { 
        const email: string = request.params.email
        try{
            const userService = await new UsersService({userRepository: new UsersRepository})

            const user = await userService.show(email);
    
            return response.status(200).json({user}) 
        }catch(error){
            error.statusCode = 400;
            error.message=`User with email(${email}) don't exist or connection refused`
            next(error)
        }     
    }


    public create = async(request: Request, response: Response, next: NextFunction) =>{
        try{
            const imgAvatar = request.file?.filename

            var newUser = request.body
            newUser = {...newUser, "avatar": imgAvatar || 'noAvatar'}
            
           if(newUser.isAdmin === 'true') newUser = {...newUser, isAdmin: true}
           
            const userService = await new UsersService({userRepository: new UsersRepository})
            const user = await userService.create({newUser});
            
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
            newUser = {...newUser, "avatar": imgAvatar || undefined};        
            if(newUser.isAdmin === 'true') newUser = {...newUser, isAdmin: true}

            const id = request.params.id;

            const userService = await new UsersService({userRepository: new UsersRepository})
            const user = await userService.update({id, newUser});

            return response.status(200).json({user})
        }catch(error){
            error.statusCode = 400;
            error.message = 'Data miss a field or Duplicate Field or connection refused'
            next(error)
        }   
    }


    public delete = async(request: Request, response: Response, next: NextFunction) =>{
        const id = request.params.id 

        try{
            const userService = await new UsersService({userRepository: new UsersRepository})
            const user = await userService.delete(id);
            return response.status(200).json({user});
        }catch(error){
            next(error)
        }
    }
}


//export default new UsersController(UsersService)


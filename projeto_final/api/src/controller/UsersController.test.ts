import { Request,NextFunction } from 'express';
import { UsersController} from './UsersController';
import { IUser } from '../services/interfaces/UsersInterface';
import {makeMockResponse} from '../mocks/mockResponse'
import {makeMockRequest} from '../mocks/mockRequest';





jest.mock('../services/UsersService')
const mockUserService = require('../services/UsersService')

describe('Users Controller Test', () =>{

    it('Should get all User', async() =>{
        const request = {} as Request;
        const response = makeMockResponse();
        const next = {} as NextFunction;

        const users: IUser[] = 
        [
            { id: '1', nickname: 'Teste', email: 'OnlyEmail', isAdmin: false, avatar: 'NoHave' },
            { id: '2', nickname: 'Test1', email: 'OnlyEmai1', isAdmin: false, avatar: 'NoHave' },
            { id: '3', nickname: 'Test2', email: 'OnlyEmai2', isAdmin: false, avatar: 'NoHave' }
        ]
        mockUserService.index = jest.fn().mockImplementation(() => Promise.resolve(users))

        const userController = new UsersController({
            userService: mockUserService
        });
        
        await userController.index(request,response, next)
        expect(response.state.status).toBe(200)
        expect(response.state.json).toHaveLength(3)
    })


    
    it('Should get One User', async() =>{
        const request = {} as Request;
        const response = makeMockResponse();
        const next = {} as NextFunction;

        request.params = {
            email: 'teste@gmail.com'
        }

        const user: IUser = { 
            id: '1', nickname: 'Teste', email: 'teste@gmail.com', isAdmin: false, avatar: 'NoHave' 
        }
        
        mockUserService.show = jest.fn().mockImplementation(() => Promise.resolve(user))

        const userController = new UsersController({
            userService: mockUserService
        });
     
        await userController.show(request,response, next)
        expect(response.state.status).toBe(200)
    })
})
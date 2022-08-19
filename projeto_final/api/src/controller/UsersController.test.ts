import { Request, NextFunction } from "express";
import { makeMockRequest } from "../mocks/mockRequest";
import { makeMockResponse } from "../mocks/mockResponse";
import { getMockUser } from "../mocks/mockUser";
import { IUser } from "../services/interfaces/UsersInterface";
import {UsersController} from "./UsersController";

jest.mock('../services/UsersService.ts', () =>{
    return{
        UserService: jest.fn().mockImplementation(() =>{
            return{
                create: jest.fn()
            }
            
        })
    }
})


describe('Users Controller', () =>{
    const mockRequest = { } as Request;
    const mockResponse = makeMockResponse()
    const mockNext = { } as NextFunction;
    const usersController = new UsersController();


    it('Deve listar os usuários', () =>{
        
        usersController.index(mockRequest, mockResponse, mockNext)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toHaveLength(5)
    })

   
})
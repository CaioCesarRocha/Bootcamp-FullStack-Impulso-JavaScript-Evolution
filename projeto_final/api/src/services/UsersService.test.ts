import { UsersService } from './UsersService';
import { UsersRepository } from '../repository/Users.repository';
import { IRequestUser, IUser} from './interfaces/UsersInterface';


jest.mock('../repository/Users.repository')
const mockUserRepository = require('../repository/Users.repository')

describe('Users Service', () =>{

    it('testing', () =>{
        const teste = 1+1
        expect(teste).toBe(2)

    });


    it('Should get all User', async() =>{
        const users: IUser[] = 
        [
            { id: '1', nickname: 'Teste', email: 'OnlyEmail', isAdmin: false, avatar: 'NoHave' },
            { id: '2', nickname: 'Test1', email: 'OnlyEmai1', isAdmin: false, avatar: 'NoHave' },
            { id: '3', nickname: 'Test2', email: 'OnlyEmai2', isAdmin: false, avatar: 'NoHave' }
        ]
        mockUserRepository.index = jest.fn().mockImplementation(() => Promise.resolve(users))

        const userService = new UsersService({
            userRepository: mockUserRepository
        });
        
        const res = await userService.index()
        expect(res[0]).toHaveProperty('id')
        expect(res).toHaveLength(3)
    })


    it('Should get one User(SHOW)', async() =>{
        const user: IUser = {
            id: '1', nickname: 'Teste', email: 'OnlyEmail', isAdmin: false, avatar: 'NoHave' 
        }
        mockUserRepository.show = jest.fn().mockImplementation(() => Promise.resolve(user))

        const userService = new UsersService({
            userRepository: mockUserRepository
        });
        
        const res = await userService.show('OnlyEmail')
        expect(res).toHaveProperty('id')
    })



    it('Should create user', async() =>{
        const newUser: IUser = {
            id: '1',
            nickname: 'Teste',
            email: 'testandosilvaaa@gmail.com',
            isAdmin: false,
            avatar: 'noAvatar'
        }

        const mockUser: IRequestUser = {
            newUser: newUser
        }

        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(newUser))

        const userService = new UsersService({
            userRepository: mockUserRepository
        });
        
        const res = await userService.create(mockUser)
        expect(res).toBe(true)
    })
})
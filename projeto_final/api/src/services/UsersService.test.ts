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

    it('Should create user', async() =>{
        const newUser: IUser = {
            nickname: 'Teste',
            email: 'testandosilva@gmail.com',
            isAdmin: false,
            avatar: 'noAvatar'
        }
        const mockUser: IRequestUser = {
            newUser: newUser
        }

        const userService = new UsersService({
            userRepository: mockUserRepository
        });
        //const teste = await userService.create(user)
        mockUserRepository.create = jest.fn().mockImplementation(() => Promise.resolve(mockUser))
        const res = await userService.create(mockUser)
        expect(res).toBe(true)

    })

    it("Shoudn't create  a user", async() =>{
        const newUser: IUser = {
            nickname: 'Teste',
            email: 'teste@gmail.com',
            isAdmin: false,
            avatar: '' // not have a avatar, then shoudn't be create.
        }
        const user: IRequestUser = {
            newUser: newUser
        }

        const userService = new UsersService({
            userRepository: mockUserRepository
        });
        const teste = await userService.create(user)
        expect(teste).toBe(true)
    })
})
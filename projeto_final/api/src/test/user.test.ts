import axios from "axios";


const server = axios.create({
    baseURL: "http://localhost:5001"
});


describe('Testing e2e - Users', () =>{

    it('Should Create users', async() =>{
        const user = await server.post('/users',{
            nickname: 'Teste',
            email: 'testandosilvaa@gmail.com',
            isAdmin: true,
            avatar: 'NoHas'
        })
        
        expect(user.status).toBe(201)
        expect(user.data.user).toBe(true)
    })

    it('Should show a error - Missing Email', async() =>{
        const user = await server.post('/users',{
            nickname: 'Teste',
            isAdmin: true,
            avatar: 'NoHas'
        })
        
        expect(user.status).toBe(400)
        
        expect(user.data.product).toHaveProperty('id')
    })

   
})
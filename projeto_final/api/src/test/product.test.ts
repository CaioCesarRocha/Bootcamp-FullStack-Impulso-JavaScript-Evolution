import axios from "axios";


const server = axios.create({
    baseURL: "http://localhost:5001"
});


describe('Testing e2e - Products', () =>{

    it('Should Create a product', async() =>{
        const res = await server.post('/products',{
            name: 'Produto testeee',
            price: 300,
            quantity: 10,
            image: 'NoHas',
            size: 'P'
        })
        
        expect(res.status).toBe(201)
        expect(res.data.product).toBe(true)
    })

    it('Should show a error - Missing Name', async() =>{
        const user = await server.post('/products',{
            price: 300,
            quantity: 10,
            image: 'NoHas',
            size: 'P'
        })
        
        expect(user.status).toBe(400)
        
        expect(user.data).toBe('Data miss a field or Duplicate Field or connection refused')
    })

   
})
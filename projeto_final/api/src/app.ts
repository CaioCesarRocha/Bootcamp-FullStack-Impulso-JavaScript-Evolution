import express from 'express';
import "reflect-metadata";
import morgan from 'morgan';
import cors from 'cors';
import path from 'path'; 
import errorHandler from './middlewares/ErrorHandler';
import { productsRoutes } from './Routes/products.routes';
import { usersRoutes } from './Routes/users.routes';
import { shoppingCartRoutes } from './Routes/shoppingcart.routes';


const server = express();

//CONFIGS DEFAULT EXPRESS
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());


//CONFIGS UPLOAD IMAGES
server.use('/uploads', express.static(path.resolve(__dirname, '..', 'public', 'uploads')));
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));


//APP ROUTES
server.use(usersRoutes);
server.use(productsRoutes);
server.use(shoppingCartRoutes)



//HANDLING ERRORS
server.use(errorHandler);


//SERVER EXECUTION PORT
server.listen(5000, ()=>{
    console.log('Servidor rodando na 5000!')
})
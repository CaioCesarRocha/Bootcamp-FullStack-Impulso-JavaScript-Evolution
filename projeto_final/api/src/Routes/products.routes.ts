import { Router } from "express";
import multer from "multer";

import MulterConfig from '../middlewares/Multer';
import ProductsController from "../controller/ProductsController";

const upload = multer(MulterConfig);
const productsRoutes = Router();


productsRoutes.get('/products', ProductsController.index);

productsRoutes.get('/products/:id', ProductsController.show);

productsRoutes.get('/products/filter/:search', ProductsController.search);

productsRoutes.post('/products', upload.single("image"), ProductsController.create );

productsRoutes.put('/products/:id', upload.single("image"), ProductsController.update );

productsRoutes.delete('/products/:id', ProductsController.delete);



export { productsRoutes};
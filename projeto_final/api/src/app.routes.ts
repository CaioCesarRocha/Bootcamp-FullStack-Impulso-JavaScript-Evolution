import { Router } from "express";
import multer from "multer";

import MulterConfig from './middlewares/Multer';
import ProductsController from "./controller/ProductsController";

const upload = multer(MulterConfig);
const appRoutes = Router();


appRoutes.get('/products', ProductsController.index);

appRoutes.get('/products/:id', ProductsController.show);

appRoutes.get('/products/filter/:search', ProductsController.search);

appRoutes.post('/products', upload.single("image"), ProductsController.create );

appRoutes.put('/products/:id', upload.single("image"), ProductsController.update );

appRoutes.delete('/products/:id', ProductsController.delete);



export { appRoutes};
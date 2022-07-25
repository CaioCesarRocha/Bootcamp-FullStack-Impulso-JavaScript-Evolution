import { Router } from "express";
import multer from "multer";

import MulterConfig from './middlewares/Multer';
import ProductsController from "./controller/ProductsController";

const upload = multer(MulterConfig);
const appRuotes  = Router();


appRuotes.get('/products', ProductsController.index);

appRuotes.get('/products/:id', ProductsController.show);

appRuotes.post('/products', upload.single("image"), ProductsController.create );

appRuotes.post('/products/:id', upload.single("image"), ProductsController.update );

appRuotes.delete('/products/:id', ProductsController.delete);



export { appRuotes};
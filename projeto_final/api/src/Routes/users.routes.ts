import { Router } from "express";
import multer from "multer";

import MulterConfig from '../middlewares/Multer';
import {UsersController} from "../controller/UsersController";

const usersController = new UsersController();

const upload = multer(MulterConfig);
const usersRoutes = Router();


usersRoutes.get('/users', usersController.index);

usersRoutes.get('/users/:email', usersController.show);

usersRoutes.post('/users', upload.single("avatar"), usersController.create );

usersRoutes.put('/users/:id', upload.single("avatar"), usersController.update );

usersRoutes.delete('/users/:id', usersController.delete);



export { usersRoutes };
import { Router } from "express";
import multer from "multer";

import MulterConfig from '../middlewares/Multer';
import UsersController from "../controller/UsersController";

const upload = multer(MulterConfig);
const usersRoutes = Router();


usersRoutes.get('/users', UsersController.index);

usersRoutes.get('/users/:id', UsersController.show);

usersRoutes.post('/users', upload.single("avatar"), UsersController.create );

usersRoutes.put('/users/:id', upload.single("avatar"), UsersController.update );

usersRoutes.delete('/users/:id', UsersController.delete);



export { usersRoutes };
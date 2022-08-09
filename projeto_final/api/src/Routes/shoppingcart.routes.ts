import { Router } from "express";

import ShoppingCartController from "../controller/ShoppingCartController";

const shoppingCartRoutes = Router();


shoppingCartRoutes.get('/shoppingcart/:id', ShoppingCartController.index )

shoppingCartRoutes.post('/shoppingcart', ShoppingCartController.create );

shoppingCartRoutes.delete('/shoppingcart/:user_id/:product_id', ShoppingCartController.delete );





export { shoppingCartRoutes };
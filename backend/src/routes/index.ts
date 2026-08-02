import { Router } from "express";
import categoryesRouter from "./category.router.js"
import cardsRouter from "./cards.router.js";



const mainRouter = Router();

mainRouter.use('/category/:categoryId/cards', cardsRouter);
mainRouter.use('/category', categoryesRouter);

export default mainRouter;
import { request, response, Router } from 'express';
import { CategoryController } from '../controllers/categoryController.js';
import { checkCategoryBody } from '../middleware/categoryMiddleware/checkCategoryBody.js';

const categoryesRouter = Router({ mergeParams: true });
const categoryController = new CategoryController();

categoryesRouter.get('/', categoryController.getManyCategoryes);

categoryesRouter.get('/:categoryId', categoryController.getOneCategory);

categoryesRouter.post(
  '/',
  checkCategoryBody,
  categoryController.createCategory,
);

categoryesRouter.put(
  '/:categoryId',
  checkCategoryBody,
  categoryController.updateCategory,
);

categoryesRouter.delete('/:categoryId', categoryController.deleteCategory);

export default categoryesRouter;

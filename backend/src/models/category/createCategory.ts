import { isCategory } from './servisec-fuctions.js';
import Category from '../../types/category/category.js';
import {
  BadRequest,
  InternalServerError,
} from '../../middleware/generalMiddleware/errorMessage.js';
import { sqlRun } from '../../utils/dbFunctions/dbConnection.js';

export const createCategory = async (category: Category) => {

    if (isCategory(category)) {
      await sqlRun(
        `INSERT INTO category(category_id, title ,type)
        VALUES (?,?,?)
        `,
        [category.categoryId, category.categoryTitle, category.type],
      );
    } else {
      throw new BadRequest('не коректно пришедшие пользовательские данные');
    }
 
};

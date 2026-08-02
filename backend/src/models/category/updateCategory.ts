import Category from '../../types/category/category.js';
import { sqlRun } from '../../utils/dbFunctions/dbConnection.js';

export const updateCategory = async (
  category: Category,
  categoryId: string,
): Promise<void> => {
  sqlRun(
    `
    UPDATE category 
    SET title = ? , type = ?
    WHERE category_id = ?
    `,
    [category.categoryTitle, category.type, categoryId],
  );
};

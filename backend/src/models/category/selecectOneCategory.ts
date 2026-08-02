import {
  BadRequest,
  InternalServerError,
} from '../../middleware/generalMiddleware/errorMessage.js';
import { oneCategoryFromBd } from '../../types/category/oneCateryResponse.js';
import { sqlGetAll } from '../../utils/dbFunctions/dbConnection.js';
import { categoryValidate } from '../../utils/dbFunctions/incomingDataFromBDValidate.js';
import {
  filterByCategorySpecial,
  mapingOneCategory,
} from './servisec-fuctions.js';

export const selecectOneCategory = async (categoryId: string) => {
  let data = await sqlGetAll(
    `SELECT 
        category.category_id AS "categoryId",
        category.title AS "categoryTitle",
        category.type,
        cards.card_id AS "cardId", 
        cards.cardTitle ,
        cards.description,
        cards.image_src AS "imageSrc",
        cards.event_date AS "event_date",
        cards.link,
        cards.ref_category_id AS "refCategoryId" 
       FROM category 
      LEFT JOIN cards
        ON cards.ref_category_id = category.category_id
        WHERE category.category_id = ?
        ORDER BY 
        cards.card_id ASC NULLS LAST 
        
        `,
    [categoryId],
  );
  console.log(data);
  categoryValidate(data, 'дата проверенна на то что массив');
  let oneCategory: oneCategoryFromBd[] = filterByCategorySpecial(data);

  return mapingOneCategory(oneCategory);
};

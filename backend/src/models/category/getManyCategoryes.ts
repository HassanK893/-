import { InternalServerError } from "../../middleware/generalMiddleware/errorMessage.js";
import { sqlGetAll } from "../../utils/dbFunctions/dbConnection.js";
import {categoryValidate} from "../../utils/dbFunctions/incomingDataFromBDValidate.js"
import { filterByCategory } from "./servisec-fuctions.js";

export const getManyCategoryes = async () => {

    const data = await sqlGetAll(
      `SELECT category_id AS "categoryId", title AS "categoryTitle",type FROM category`,
    );
    console.log(data)
    categoryValidate(
      data,
      'некоректные тип данных пришел при запросе на категорию',
    );
  
    return filterByCategory(data);
  
};

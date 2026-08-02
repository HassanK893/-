import { sqlGetAll } from "../../utils/dbFunctions/dbConnection.js";
import { cardValidate, filterByCards } from "./servisec-fuctions.js";

export const getManyCardsFromDb = async (categoryId: string) => {

  const data: unknown = await sqlGetAll(
    `SELECT 
        card_id AS "cardId", 
        cardTitle ,
        description,
        image_src AS "imageSrc",
        event_date AS "event_date",
        link,
        ref_category_id AS "refCategoryId"  
      FROM cards
      WHERE  ref_category_id = ?
        `,
    [categoryId],
  );
  cardValidate(
    data,
    'некоректные тип данных пришел при запросе на карты',
  );

  return filterByCards(data);

};
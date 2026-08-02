
import { BadRequest } from '../../middleware/generalMiddleware/errorMessage.js';
import {
  sqlGet
} from '../../utils/dbFunctions/dbConnection.js';
import { isCard } from './servisec-fuctions.js';


export const selecectOneCard = async (categoryId: string, cardId: string) => {

  const oneCard: unknown = await sqlGet(
    `
      SELECT 
        cards.card_id AS "cardId", 
        cards.cardTitle ,
        cards.description,
        cards.image_src AS "imageSrc",
        cards.event_date AS "event_date",
        cards.link,
        cards.ref_category_id AS "refCategoryId" 
      FROM cards
        WHERE cards.ref_category_id = ? AND cards.card_id = ?
      `,
    [categoryId, cardId],
  );
  console.log(oneCard);
  if (!isCard(oneCard)) {
    throw new BadRequest(
      'из бд вместо одной карточки пришли несоотвествующие данные',
    );
  }
  return oneCard;

};
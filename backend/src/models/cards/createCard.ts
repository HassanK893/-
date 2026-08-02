import {
  BadRequest,
  InternalServerError,
} from '../../middleware/generalMiddleware/errorMessage.js';
import { isCard, filterByCards, cardValidate } from './servisec-fuctions.js';
import Card from '../../types/cards/card.js';
import {
  sqlRun,
} from '../../utils/dbFunctions/dbConnection.js';

export const createCard = async (card: Card) => {
  if (isCard(card)) {
    await sqlRun(
      `INSERT INTO cards
      (card_id , cardTitle ,description,image_src,event_date,link,ref_category_id )
        VALUES (?,?,?,?,?,?,?)
        `,
      [
        card.cardId,
        card.cardTitle,
        card.description,
        card.imageSrc,
        card.event_date,
        card.link,
        card.refCategoryId,
      ],
    );

    
  } else {
    throw new BadRequest('не коректно пришедшие пользовательские данные');
  }
};

import { BadRequest } from '../../middleware/generalMiddleware/errorMessage.js';
import Card from '../../types/cards/card.js'
import Category from "../../types/category/category.js"

export const isCard = (data: unknown): data is Card => {

    const card = data as Card;
  return Boolean(
    card &&
    typeof card === 'object' &&
    card.cardId &&
    card.cardTitle &&
    card.refCategoryId 
    
  );
 

};
 
export const filterByCards = (date: unknown[]) => {
  return date
    .map((card) => {
      if (isCard(card)) {
        return card;
      }
      return undefined;
    })
    .filter((card): card is Card => card !== undefined);
};

export function cardValidate(
  data: unknown,
  message: string, 
): asserts data is unknown[] {
  if (!Array.isArray(data)) {
    console.error(`Некоректный формат данных: ${data}`);
    throw new BadRequest(message);
  }
}


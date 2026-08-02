import { BadRequest } from '../../middleware/generalMiddleware/errorMessage.js';
import Card from '../../types/cards/card.js';
import { sqlRun } from '../../utils/dbFunctions/dbConnection.js';
import { selecectOneCard } from './getOneCard.js';
import { isCard } from './servisec-fuctions.js';
import { join, dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const updateCardFromBd = async (
  card: Card,
  categoryId: string,
  cardId: string,
) => {
    
  if (isCard(card)) {
     
    const oneCard: Card = await selecectOneCard(categoryId, cardId);
   
    let imageSrc: string = '';

    if (!isCard(oneCard)) {
      throw new BadRequest(
        'из бд вместо одной карточки пришли несоотвествующие данные',
      );
    }

    if (oneCard.imageSrc && card.imageSrc) {
      imageSrc = oneCard.imageSrc;
    }

    await sqlRun(
      `
    UPDATE cards SET 
    card_id = ? ,
    cardTitle = ? ,
    description = ? ,
    image_src = ?,
    event_date = ? ,
    link = ?,
    ref_category_id = ?
    WHERE  ref_category_id = ? AND  card_id = ? 
    `,
      [
        card.cardId,
        card.cardTitle,
        card.description,
        card.imageSrc,
        card.event_date,
        card.link,
        card.refCategoryId,
        categoryId,
        cardId,
      ],
    );

    const path: string = join(__dirname, '../../../uploads', imageSrc);

    if (fs.existsSync(path)) {
      await fs.unlink(path, (err) => {
        console.error(`файл не удалось удалить ${err}`);
      });
    }
  } else {
    throw new BadRequest(
      'При обновление карточки произошла неизвестная ошибка',
    );
  }
};

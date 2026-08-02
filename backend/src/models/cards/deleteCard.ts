import { BadRequest } from "../../middleware/generalMiddleware/errorMessage.js";
import Card from "../../types/cards/card.js";
import { sqlRun } from "../../utils/dbFunctions/dbConnection.js";
import { selecectOneCard } from "./getOneCard.js";
import { isCard } from "./servisec-fuctions.js";
import { join, dirname } from "path"
import fs from "fs"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const deleteOneCard = async (categoryId: string, cardId: string) => {
  
    const oneCard: Card = await selecectOneCard(categoryId, cardId)
    let imageSrc: string = "";


    if (!isCard(oneCard)) {
      throw new BadRequest(
        'из бд вместо одной карточки пришли несоотвествующие данные',
      );
    }

    if (oneCard.imageSrc) {
      imageSrc = oneCard.imageSrc;
    }


    await sqlRun(
      `
  DELETE  FROM cards 
  WHERE 
  ref_category_id = ? AND card_id = ? 
  `,
      [categoryId, cardId],
    );

    const path: string = join(__dirname, '../../../uploads', imageSrc)

    if (imageSrc && fs.existsSync(path)) {
      try {
        await fs.promises.unlink(path);
      } catch (err) {
        console.error(`файл не удалось удалить: ${err}`);
      }
    }


  
};
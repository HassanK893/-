import { BadRequest } from '../../middleware/generalMiddleware/errorMessage.js';
import { sqlRun } from '../../utils/dbFunctions/dbConnection.js';
import { selecectOneCategory } from './selecectOneCategory.js';
import { join, dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const deleteOneCategory = async (categoryId: string): Promise<void> => {
  
  let imagesFromDeleteArr: string[] = [];
 
     imagesFromDeleteArr = await foundAllCardsImages(categoryId);
  
  await sqlRun(
    `
    DELETE FROM category
    WHERE category_id = ?
    `,
    [categoryId],
  );

  deletedCardsImages(imagesFromDeleteArr);

  console.log('eddwewd ');
};

const foundAllCardsImages = async (categoryId: string): Promise<string[]> => {
  const oneCategory = await selecectOneCategory(categoryId);
  const imagesFromDeleteArr: string[] = [];
  if (!oneCategory) {
    throw new BadRequest(`в функции по удалению категории 
            при попытки проверить наличие категории для удаления произошщла ошибка`);
  }

  if (oneCategory?.cards?.length) {
    for (let card of oneCategory.cards) {
      if (card.imageSrc && typeof card.imageSrc === 'string') {
        imagesFromDeleteArr.push(card.imageSrc);
      }
    }
  }

  return imagesFromDeleteArr;
};

const deletedCardsImages = async(imagesFromDeleteArr: string[]):Promise<void> =>{
if (imagesFromDeleteArr.length) {
  for (let i = 0; i < imagesFromDeleteArr.length; i++) {
    const path = join(__dirname, '../../../uploads', imagesFromDeleteArr[i]!);

    if (fs.existsSync(path)) {
      await fs.unlink(path, (err) => {
        console.log(`При удаление категории не удалось удалить файл у 
                    одной из принадлежащих этой категории карточек - ${err}`);
      });
    }
  }
}
};

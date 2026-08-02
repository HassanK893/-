import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { ResponseErrorJsonMessage } from '../../types/utils/Response.js';
import cardRequest from '../../types/cards/cardRequest.js';
import { BadRequest, NotFound } from '../generalMiddleware/errorMessage.js';
import { CheckErrorClassForStatus } from '../../utils/CheckErrorClassForStatus.js';
import { getManyCategoryes } from '../../models/category/index.js';
import { checkDataEmpty } from '../../utils/dbFunctions/incomingDataFromBDValidate.js';
import Category from '../../types/category/category.js';
export const checkUpdatingCardRequestBody = async (
  { body }: Request<{}, {}, cardRequest>,
  response: Response<ResponseErrorJsonMessage>,
  next: NextFunction,
) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    console.log(body.imageSrc + 'ppp');
    await checkingTheExistenceCategoryId(body.refCategoryId);
    checkingTheExistenceFile(__dirname, body.imageSrc);

    if (!body.cardTitle) {
      throw new NotFound(
        'к сожелению в теле запроса не были найдены поля cardTitle или refCategoryId',
      );
    }
    next();
    return;
  } catch (error) {
    let status: number = CheckErrorClassForStatus(error);
    return response.status(status).json({
      status: status,
      error: error,
      message: 'После обновления мы не можем найти файл по какой-то причине',
    });
  }
};

const checkingTheExistenceFile = (__dirname: string, image: string | null) => {
  if (image) {
    const path = join(__dirname, '../../../uploads', image);

    if (!fs.existsSync(path)) {
      throw new BadRequest(
        'После обновления мы не можем найти файл по какой-то причине',
      );
    }
  }
};

const checkingTheExistenceCategoryId = async (
  refCategoryId: string,
): Promise<void> => {
  if (refCategoryId) {
    const allCategoryes: Category[] = await getManyCategoryes();
    checkDataEmpty(allCategoryes, 'Категории не существует');
    let arrCategoryId: string[] = [];

    for (let i = 0; i < allCategoryes.length; i++) {
      arrCategoryId.push(allCategoryes[i]!.categoryId);
    }
    if (!arrCategoryId.includes(refCategoryId)) {
      throw new BadRequest(
        'невозвомжно изменить ссылку на id категории на другое' +
          ' id так как категории с таким id не существует',
      );
    }
  }
};

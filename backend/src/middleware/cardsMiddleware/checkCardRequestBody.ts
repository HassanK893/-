import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { ResponseErrorJsonMessage } from '../../types/utils/Response.js';
import cardRequest from '../../types/cards/cardRequest.js';
import { BadRequest, NotFound } from '../generalMiddleware/errorMessage.js';
import { CheckErrorClassForStatus } from '../../utils/CheckErrorClassForStatus.js';

export const checkCardRequestBody = (
  { body }: Request<{}, {}, cardRequest>,
  response: Response<ResponseErrorJsonMessage>,
  next: NextFunction,
) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    console.log(body.imageSrc + "ppp")
    checkingTheExistenceFile(__dirname,body.imageSrc);

    if ( !body.cardTitle) {
      throw new NotFound(
        'к сожелению в теле запроса не были найдены поля cardTitle или refCategoryId',
      );
    }
    next();
    return
  } catch (error) {
    let status: number = CheckErrorClassForStatus(error);
    return response.status(status).json({
      status: status,
      error: error,
      message: 'После создания мы не можем найти файл по какой-то причине',
    });
  }
};

const checkingTheExistenceFile = (
  __dirname:string,
  image: string | null,
) => {
  if (image) {
    const path = join(__dirname, '../../../uploads', image);
    if (!fs.existsSync(path)) {
      console.log('КОД ПИДОР');
      throw new BadRequest(
        'После создания мы не можем найти файл по какой-то причине',
      );
    }
  }
};

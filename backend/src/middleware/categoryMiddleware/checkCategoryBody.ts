import {Request,Response,NextFunction} from 'express'
import {ResponseErrorJsonMessage} from '../../types/utils/Response.js'
import categoryRequest from '../../types/category/categoryRequest.js'
export const checkCategoryBody = (
  { body }: Request<{},{},categoryRequest>,
  response: Response<ResponseErrorJsonMessage>,
  next: NextFunction,
) => {
  if (!body.categoryTitle || !body.type) {
    return response.status(400).json({
      status: 400,
      message: 'Не переданы обязательные поля categoryTitle или type',
    });
  }
  next()
};
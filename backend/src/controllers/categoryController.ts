import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import {
  requestCardsParamsId,
  requestCategoryParamsId,
} from '../types/utils/requestParamsId.js';
import categoryResponseType from '../types/category/categoryResponseType.js';
import categoryRequest from '../types/category/categoryRequest.js';
import {
  createCategory,
  getManyCategoryes,
  selecectOneCategory,
  deleteOneCategory,
  updateCategory,
} from '../models/category/index.js';
import Category from '../types/category/category.js';
import {
  BadRequest,
  InternalServerError,
} from '../middleware/generalMiddleware/errorMessage.js';
import {
  CreatedSuccess,
  NoContentSuccess,
  OkSuccess,
} from '../middleware/generalMiddleware/succesMessege.js';
import {
  oneCategoryResponse,
  oneCategoryFromBd,
  oneCategoryFromBd2,
} from '../types/category/oneCateryResponse.js';
import {
  categoryValidate,
  checkDataEmpty,
} from '../utils/dbFunctions/incomingDataFromBDValidate.js';
import { ResponseErrorJsonMessage } from '../types/utils/Response.js';
import { CheckErrorClassForStatus } from '../utils/CheckErrorClassForStatus.js';
import { isCategory } from '../models/category/servisec-fuctions.js';

export class CategoryController {
  constructor() {}

  async createCategory(
    { body }: Request<{}, Category, categoryRequest>,
    response: Response<Category | ResponseErrorJsonMessage>,
  ) {
    try {
      const category: Category = {
        categoryId: randomUUID(),
        categoryTitle: body.categoryTitle,
        type: body.type,
      };

      await createCategory(category);
      new CreatedSuccess(response, category);
    } catch (error) {
      const status: number = CheckErrorClassForStatus(error);

      response.status(status).json({
        status: status,
        message: 'При создание категории что то пошло не так',
      });
    }
  }

  async getOneCategory(
    {
      params,
    }: Request<requestCategoryParamsId, oneCategoryFromBd[], categoryRequest>,
    response: Response<oneCategoryFromBd[] | ResponseErrorJsonMessage>,
  ): Promise<void> {
    try {
      const category: oneCategoryResponse = await selecectOneCategory(
        params.categoryId,
      );

      new OkSuccess(response, category, 'успешное получение одной категории');
    } catch (error) {
      const status: number = CheckErrorClassForStatus(error);

      response.status(status).json({
        status: status,
        message: 'При получение одной категории что то пошло не так',
      });
    }
  }

  async getManyCategoryes(
    request: Request<{}, categoryResponseType, categoryRequest>,
    response: Response<categoryResponseType | ResponseErrorJsonMessage>,
  ): Promise<void> {
    try {
      const categoryes = await getManyCategoryes();
      checkDataEmpty(categoryes, 'Категории не существует');

      new OkSuccess(
        response,
        categoryes,
        'Успешное получения массива карточек',
      );
    } catch (error) {
      const status: number = CheckErrorClassForStatus(error);

      response.status(status).json({
        status: status,
        message: 'При получение нескольких категорий что то пошло не так',
      });
    }
  }

  async updateCategory(
    {
      params,
      body,
    }: Request<requestCategoryParamsId, Category, categoryRequest>,
    response: Response<Category | ResponseErrorJsonMessage>,
  ): Promise<void> {
    try {
      const category: Category = {
        categoryId: params.categoryId,
        categoryTitle: body.categoryTitle,
        type: body.type,
      };
      
      await updateCategory(category, params.categoryId);
      new CreatedSuccess(response, category);
    } catch (error) {
      const status: number = CheckErrorClassForStatus(error);
      response.status(status).json({
        status: status,
        message: 'При получение нескольких категорий что то пошло не так',
      });
    }
  }

  async deleteCategory(
    { params }: Request<requestCategoryParamsId, ResponseErrorJsonMessage, {}>,
    response: Response<ResponseErrorJsonMessage>,
  ): Promise<void> {
    try {
      await deleteOneCategory(params.categoryId);
      new NoContentSuccess(response, [], 'карточка успешно удалена');
    } catch (error) {
      const status: number = CheckErrorClassForStatus(error);
      response.status(status).json({
        status: status,
        message: 'При получение нескольких категорий что то пошло не так',
      });
    }
  }

  searchCategoryByText(
    request: Request<{}, categoryResponseType, categoryRequest>,
    response: Response<categoryResponseType>,
  ): void {
    try {
    } catch (error) {}
  }
}

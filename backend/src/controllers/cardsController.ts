import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import {
  requestCardsParamsId,
  requestCategoryParamsId,
} from '../types/utils/requestParamsId.js';
import categoryResponseType from '../types/category/categoryResponseType.js';
import categoryRequest from '../types/category/categoryRequest.js';
import {
  CreatedSuccess,
  OkSuccess,
  NoContentSuccess,
} from '../middleware/generalMiddleware/succesMessege.js';
import cardRequest from '../types/cards/cardRequest.js';
import cardsResponseType from '../types/cards/cardsResponseType.js';
import Card from '../types/cards/card.js';
import { ResponseErrorJsonMessage } from '../types/utils/Response.js';
import { CheckErrorClassForStatus } from '../utils/CheckErrorClassForStatus.js';
import {
  createCard,
  selecectOneCard,
  deleteOneCard,
  getManyCardsFromDb,
} from '../models/cards/index.js';
import { request } from 'node:http';
import { checkDataEmpty } from '../utils/dbFunctions/incomingDataFromBDValidate.js';
import cardRequestUpdate from '../types/cards/cardRequestUpdate.js';
import { updateCardFromBd } from '../models/cards/index.js';
import { isCard } from '../models/cards/servisec-fuctions.js';
import { BadRequest } from '../middleware/generalMiddleware/errorMessage.js';

export class CardsController {
  constructor() {}

  async createCard(
    {
      params,
      body,
    }: Request<
      requestCategoryParamsId,
      Card | ResponseErrorJsonMessage,
      cardRequest
    >,
    response: Response<Card | ResponseErrorJsonMessage>,
  ) {
    try {
      const card: Card = {
        cardId: randomUUID(),
        cardTitle: body.cardTitle,
        imageSrc: body.imageSrc ? body.imageSrc : null,
        description: body.description ? body.description : null,
        link: body.link ? body.link : null,
        event_date: body.event_date ? body.description : null,
        refCategoryId: params.categoryId,
      };

      console.log(card);
      await createCard(card);
      new CreatedSuccess(response, card, 'успешное создание карточки');
    } catch (error) {
      const status: number = CheckErrorClassForStatus(error);
      response.status(status).json({
        status: status,
        message:
          'на момент создания карточки данные из тела были получены не правильно',
        error: error,
      });
    }
  }

  async getOneCard(
    {
      params,
    }: Request<requestCardsParamsId, Card | ResponseErrorJsonMessage, {}>,
    response: Response<Card | ResponseErrorJsonMessage>,
  ): Promise<void> {
    const card = await selecectOneCard(params.categoryId, params.cardId);

    new OkSuccess(response, card, 'Одна карточка успешно получена');
    try {
    } catch (error) {
      const status: number = CheckErrorClassForStatus(error);
      response.status(status).json({
        status: status,
        message:
          'на момент создания карточки данные из тела были получены не правильно',
        error: error,
      });
    }
  }

  async getManyCards(
    {
      params,
    }: Request<
      requestCategoryParamsId,
      cardsResponseType | ResponseErrorJsonMessage,
      cardRequest
    >,
    response: Response<cardsResponseType | ResponseErrorJsonMessage>,
  ): Promise<void> {
    try {
      const cards = await getManyCardsFromDb(params.categoryId);
      console.log(cards);
      checkDataEmpty(cards, 'Категории не существует');
      new OkSuccess(response, cards, 'Успешное получения массива карточек');
    } catch (error) {
      const status: number = CheckErrorClassForStatus(error);
      response.status(status).json({
        status: status,
        message:
          'на момент  получения карточек  из бд были получены не правильно',
        error: error,
      });
    }
  }

  async updateCard(
    {
      params,
      body,
    }: Request<
      requestCardsParamsId,
      Card | ResponseErrorJsonMessage,
      cardRequestUpdate
    >,
    response: Response<Card | ResponseErrorJsonMessage>,
  ) {
    try {
      const existingCard = await selecectOneCard(
        params.categoryId,
        params.cardId,
      );
      if (!isCard(existingCard)) {
        throw new BadRequest(
          'При получение существующей карточки для ее изменения произошла ошибка' +
            ' (Скорее всего либо этой карточки не существует либо данные не соотвествуют)',
        );
      }

      const card: Card = {
        cardId: params.cardId,
        cardTitle: body.cardTitle 
        ? body.cardTitle
        : existingCard.cardTitle,
        imageSrc: body.imageSrc 
          ? body.imageSrc 
          : existingCard.imageSrc,
        description: body.description
          ? body.description
          : existingCard.description,
        link: body.link ? body.link : existingCard.link,
        event_date: body.event_date
          ? body.description
          : existingCard.event_date,
        refCategoryId: body.refCategoryId
          ? body.refCategoryId
          : params.categoryId,
      };

      await updateCardFromBd(card, params.categoryId, params.cardId);
      new CreatedSuccess(response, card, 'успешное создание карточки');
    } catch (error) {
      const status: number = CheckErrorClassForStatus(error);
      response.status(status).json({
        status: status,
        message:
          'на момент обновления карточки  из тела были получены не правильно',
        error: error,
      });
    }
  }

  async deleteCard(
    { params }: Request<requestCardsParamsId, ResponseErrorJsonMessage, {}>,
    response: Response<ResponseErrorJsonMessage>,
  ): Promise<void> {
    try {
      await deleteOneCard(params.categoryId, params.cardId);
      new NoContentSuccess(response, [], 'карточка успешно удалена');
    } catch (error) {
      const status: number = CheckErrorClassForStatus(error);
      response.status(status).json({
        status: status,
        message:
          'на момент создания карточки данные из тела были получены не правильно',
        error: error,
      });
    }
  }
}

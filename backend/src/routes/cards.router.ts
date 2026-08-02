import { Router } from 'express';
import fileUploader from 'express-fileupload';
import { fileProcessing } from '../middleware/cardsMiddleware/fileProcessing.js'
import { checkCardRequestBody } from '../middleware/cardsMiddleware/checkCardRequestBody.js'
import {checkUpdatingCardRequestBody} from '../middleware/cardsMiddleware/checkUpdatingCardRequestBody.js';
import { CardsController } from '../controllers/cardsController.js'


const cardsRouter = Router({ mergeParams: true });
const cardsController = new CardsController()

cardsRouter.get('/', cardsController.getManyCards);

cardsRouter.get('/:cardId', cardsController.getOneCard);

cardsRouter.post(
  '/',
  fileUploader({
    limits: { fileSize: 3 * 1024 * 1024 },
    abortOnLimit: false,

    createParentPath: true

  }),
  fileProcessing,
  checkCardRequestBody,
  cardsController.createCard
);

cardsRouter.put(
  '/:cardId',
  fileUploader({
    limits: { fileSize: 3 * 1024 * 1024 },
    abortOnLimit: false,

    createParentPath: true,
  }),
  fileProcessing,
  checkUpdatingCardRequestBody,
  cardsController.updateCard,
);

cardsRouter.delete('/:cardId', cardsController.deleteCard);

export default cardsRouter;

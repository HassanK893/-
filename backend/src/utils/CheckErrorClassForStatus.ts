import {BadRequest, ConflictError, InternalServerError, NotFound} from '../middleware/generalMiddleware/errorMessage.js'

export const CheckErrorClassForStatus = (error: unknown): number => {
  let status: number = 400;
  if (error instanceof NotFound) {
    status = 404;
  }
  if (error instanceof BadRequest) {
    status = 400;
  }
  if (error instanceof ConflictError) {
    status = 409;
  }
  if (error instanceof InternalServerError) {
    status = 500;
  }
  return status;
};

import { Request, Response } from 'express';
import { ResponseErrorJsonMessage } from '../types/utils/Response.js';

const validateRequestData = (
  req: Request,
  res: Response<ResponseErrorJsonMessage>,
  next: () => void,
): Response<ResponseErrorJsonMessage> | void => {
  const { originalUrl, method } = req;
  const userIp = req.ip;

  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!allowedMethods.includes(method)) {
    return res
      .status(400)
      .json({ status: 400, message: 'HTTP метод не подходит' });
  }

  // дополнить в будующем метод чтобы он сверял все с доступными нам путями
  if (!originalUrl || originalUrl === '/') {
    console.log('такого маршрута не сушествует');
  }

  if (!userIp) {
    console.log('IP  юзура недоступно');
  }

  next();
};

export default validateRequestData;

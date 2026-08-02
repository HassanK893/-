import { Request, Response } from 'express';
import requestHttpData from '../types/utils/requestHttpData.js';
import { ResponseErrorJsonMessage } from '../types/utils/Response.js';

const createLogString = (userInfo: requestHttpData): string => {
  let result = '';
  for (const key in userInfo) {
    result += ` ${String(userInfo[key as keyof requestHttpData])}`;
  }
  return result;
};

const requestLogger = (
  request: Request,
  response: Response<ResponseErrorJsonMessage>,
  next: () => void,
): Response<ResponseErrorJsonMessage> | void=> {
  const httpRequestInfo: requestHttpData = {
    userIp: request.ip,
    originalUrl: request.originalUrl,
    method: request.method,
  };

  if (
    !httpRequestInfo ||
    !httpRequestInfo.originalUrl ||
    !httpRequestInfo.method
  ) {
    return response
      .status(404)
      .json({ status: 404, message: 'Ваших http методов не сушествует' });
  }
  console.log(`Данные о запросе юзера: ${createLogString(httpRequestInfo)}`);
  next();
};

export default requestLogger;

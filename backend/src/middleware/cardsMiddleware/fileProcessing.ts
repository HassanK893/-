import { NextFunction, Request, Response } from 'express';
import {
  NotFound,
  InternalServerError,
  BadRequest,
  ConflictError,
} from '../generalMiddleware/errorMessage.js';
import { UploadedFile } from 'express-fileupload';
import fs, { stat } from 'fs';
import { join, basename, extname, dirname } from 'path';

import { CheckErrorClassForStatus } from '../../utils/CheckErrorClassForStatus.js';
import { ResponseErrorJsonMessage } from '../../types/utils/Response.js';
import cardRequest from '../../types/cards/cardRequest.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const fileProcessing = async (
  request: Request<{}, ResponseErrorJsonMessage, cardRequest>,
  response: Response<ResponseErrorJsonMessage>,
  next: NextFunction,
) => {
  try {
    console.log(typeof request.body.imageSrc);
    if (request.body.imageSrc === undefined) {
      console.log('dsds');
      next();
      return;
    }
    console.log('Processing file...');
  
    let file = fileValidate(request);

    console.log(file);
    if (!file) {
      throw new NotFound('В стеке с файлами пусто');
    }

    if (checkFileSize(file)) {
      throw new ConflictError();
    }

    file.name = checkFileNameUnique(file.name);
    console.log(file.name + ' ppp');

    request.body.imageSrc = file.name;
    console.log(request.body.imageSrc + 'zzz');

    const path = join(__dirname, '../../../uploads', file.name);

    await file.mv(path);

    next();
    return;
  } catch (error) {
    const status: number = CheckErrorClassForStatus(error);
    let truncated: boolean = false;

    if (status === 409) {
      truncated = true;
    }
    return response.status(status).json({
      truncated: truncated,
      status: status,
      error: error,
      message:
        'При обработки файла для его добавляения в папку проэкта произошла ошибка',
    });
  }
};

const checkFileSize = (file: UploadedFile | undefined): boolean => {
  if (file?.truncated) {
    return true;
  }
  return false;
};

const checkFileNameUnique = (name: string): string => {
  const path = join(__dirname, '../../../uploads', name);
  const expansion = extname(name);
  const mainName = basename(name, expansion);
  console.log(mainName, 'ddd');
  if (fs.existsSync(path)) {
    let corretedName: string = workWhithMainName(mainName);

    name = corretedName + expansion;
    name = checkFileNameUnique(name);
  }
  return name;
};

const workWhithMainName = (name: string): string => {
  const numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  if (!numbersArray.includes(name.charAt(name.length - 1))) {
    name = name + '0';
    return name;
  } else {
    if (name.charAt(name.length - 1) === '9') {
      name = numbersArray.includes(name.charAt(name.length - 2))
        ? name.slice(0, name.length - 2) +
          String(parseInt(name.charAt(name.length - 2)) + 1) +
          '0'
        : name.slice(0, name.length - 1) +
          String(parseInt(name.charAt(name.length - 1)) + 1);
      console.log(name, 'wewqeq');
      return name;
    }
    name =
      name.slice(0, name.length - 1) +
      String(parseInt(name.charAt(name.length - 1)) + 1);
    console.log(name, 'eee');
    return name;
  }
};

const fileValidate = (request: Request): UploadedFile | undefined => {
  if (!request.files) {
    throw new NotFound('В стеке с фалами пусто');
  }

  const uploaded = request.files.myFile;
  if (!uploaded || (Array.isArray(uploaded) && !uploaded[0])) {
    throw new NotFound('Список файлов приходящих под именнем myFile пуст');
  }
  let file: UploadedFile;
  if (Array.isArray(uploaded)) {
    file = uploaded[0]!;
  } else {
    file = uploaded;
  }
  if (file) {
    return file;
  } else {
    throw new NotFound('Список файлов приходящих под именнем myFile пуст');
  }
};

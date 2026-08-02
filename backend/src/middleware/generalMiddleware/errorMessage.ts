

 class AppError extends Error {
  readonly  statusCode: number
  constructor(messege: string, statusCode: number) {
   super(messege);
   this.statusCode = statusCode;
   this.name = this.constructor.name
   Error.captureStackTrace(this,this.constructor)
  } 
}


export class BadRequest extends AppError{
    constructor(message:string = "Некоректный запрос"){
        super(message,400);
    }

}

export class NotFound extends AppError{
    constructor(messege:string = "Некоректный пользовательский ввод"){
        super(messege,404)
    }
}

export class ConflictError extends AppError{
    constructor(message:string = "Ресурс уже существует "){
        super(message,409);
    }
}

export class InternalServerError extends AppError{
    constructor(message: string = "Внутренияя ошибка сервера"){
        super(message,500)
    }
}

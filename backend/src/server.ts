import express, { Application } from 'express';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import IServerSettingsEnv from './types/env.js';
import getEnv from './config/env.js';
import mainRouter from './routes/index.js';
import validateRequestData from './middleware/validateRequestData.js'
import requestLogger from './middleware/requestLogger.js';
import createTables from '../database/createDatabase.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export default class Server {
  server: Application = express();
  env: IServerSettingsEnv;

  constructor(serverSettingsEnv: IServerSettingsEnv) {
    this.env = serverSettingsEnv;
    this.init();
  }

  init() {
    this.createDatabase();
    this.setupMiddleware();
    this.createMainRouter();
    this.startServer();
  }
  private  async createDatabase(){
  const database =  new createTables()
  await database.init()
  }
  private setupMiddleware() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use('/uploads', express.static(path.join(__dirname, '../uploads')));
  }
  private startServer() {
    this.server
      .listen(this.env.PORT, () => {
        console.log(`подключение к порту ${this.env.PORT} прошло успешно`);
      })
      .on('error', (err: unknown) => {
        console.error(
          `произошла ошибка ${err} с подключением на порту ${this.env.PORT},
           возможно этот порт занят`,
        );
      });
  }
  private createMainRouter() {
    this.server.use(validateRequestData);
    this.server.use(requestLogger);
    this.server.use('/', mainRouter);
  }
}



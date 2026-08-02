import sqlite3 from 'sqlite3';
import env from '../../config/env.js';
import { response } from 'express';
const { Database } = sqlite3;

const db = new Database(env.SQLITE_PATH, (error) => {
  console.log(`${env.SQLITE_PATH} файл базы данных успешно создан`);
  if (error) {
    console.error(error);
    process.exit(1);
  }
});


export const sqlRun = (sql: string, params?: unknown[]): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    try {
      db.run(sql, params, (error: unknown, data: unknown) => {
        if (error) {
          console.error(`Ошибка при выполнении SQL: ${error}`);
          reject(error);
          return;
        }
        console.log(`SQL выполнен успешно: ${data}`);
        resolve(data);
      });
    } catch (error) {
      console.error(`Синхронная ошибка при вызове db.run: ${error}`);
      reject(error);
    }
  });
};

export const sqlGet = (sql: string, params?: unknown[]): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error: unknown, data: unknown) => {
      try {
        if (error) {
          reject(error);
          console.error(`Ошибка при выполнении SQL: ${error}`);
          return;
        }
        console.log(`SQL выполнен успешно: ${data}`);
        resolve(data);
      } catch (error) {
        console.error(`Синхронная ошибка при вызове db.get: ${error}`);
        reject(error);
      }
    });
  });
};

export const sqlGetAll = (
  sql: string,
  params?: unknown[],
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error: unknown, data: unknown) => {
      try {
        if (error) {
          reject(error);
          console.error(`Ошибка при выполнении SQL: ${error}`);
          return;
        }

        resolve(data);

        console.log(`SQL выполнен успешно: ${data}`);
      } catch (error) {
        console.error(`Синхронная ошибка при вызове db.all: ${error}`);
        reject(error);
      }
    });
  });
};

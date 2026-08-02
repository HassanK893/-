import express from 'express';
import getEnv from './config/env.js';
import mainRouter from './routes/index.js';
import Server from './server.js';
import serverSettingsEnv from './config/env.js';
function run() {
  try {
    new Server(serverSettingsEnv);
  } catch (error) {
    console.error(
      `в файле app произошла ошибка ${error}. Пожайлуйста перепроверьте этот момент`,
    );
  }
}

run();

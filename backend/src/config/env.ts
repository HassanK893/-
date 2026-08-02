import logEnvVariable from '../utils/logger/env-logger.js';
import IServerSettingsEnv from '../types/env.js';

function getEnv() {

    logEnvVariable(process.env.PORT, 'PORT');
    logEnvVariable(process.env.SQLITE_PATH, 'SQLITE_PATH');
    const env: IServerSettingsEnv = {
      PORT: +(process.env.PORT || 80),
      SQLITE_PATH: process.env.SQLITE_PATH || './database',
    };
    return env;
 
}
const serverSettingsEnv = getEnv();
export default serverSettingsEnv;

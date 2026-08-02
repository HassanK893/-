import 'express';

declare global {
  namespace Express {
    interface Request {
      userInfo?: {
        userIp: string | undefined;
        originalUrl: string;
        method: string;
      };
    }
  }
}

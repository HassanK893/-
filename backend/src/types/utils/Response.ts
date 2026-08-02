export type ResponseErrorJsonMessage = {
  status: number,
  message: string,
  error?: unknown,
  truncated?: boolean,
};
import 'dotenv/config';

export const cfg = {
  baseUrl: process.env.BASE_URL || 'https://reqres.in',
  acceptLanguage: process.env.ACCEPT_LANGUAGE || 'en-US',
  apiToken: process.env.API_TOKEN || 'demo-token',
  retryMax: Number(process.env.RETRY_MAX || 2),
  logLevel: process.env.LOG_LEVEL || 'info',
};

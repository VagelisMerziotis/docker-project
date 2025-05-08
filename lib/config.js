import path from 'path';

export const WRITE_DATE_FORMAT = 'MM/dd/yyyy HH:mm:ss';

export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const POSTGRES_URL = process.env.POSTGRES_URL;
export const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
export const GOOGLE_SHEET_TAB_NAME = process.env.GOOGLE_SHEET_TAB_NAME;
export const GOOGLE_SERVICE_ACCOUNT_KEY_PATH = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;

export const LOG_DESTIONATION = process.env.LOG_DESTIONATION ?? path.join(__dirname, '../logs');

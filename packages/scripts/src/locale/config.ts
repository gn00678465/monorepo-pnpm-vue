import { google } from 'googleapis';
import dotenv from 'dotenv';
import credentials from '../../credentials.json';

dotenv.config();

export const SHEET_ID = process.env.SHEET_ID as string;

export const languages = ['zhTW', 'enUS', 'jaJP'] as const;

export const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: 'https://www.googleapis.com/auth/spreadsheets'
});

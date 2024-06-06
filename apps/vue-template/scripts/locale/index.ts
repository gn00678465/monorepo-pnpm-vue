import { I18nToolkit } from '@pnpm-monorepo-vue/locale-kit';
import credentials from '../credentials.json';
import dotenv from 'dotenv';

dotenv.config();

export const i18nToolkit = new I18nToolkit({
  sheetId: process.env.SHEET_ID as string,
  languages: ['zhTW', 'enUS'],
  credentials
});

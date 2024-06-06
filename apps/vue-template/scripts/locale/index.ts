import { LocaleKit } from '@pnpm-monorepo-vue/scripts';
import credentials from '../../credentials.json';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

export const localKit = new LocaleKit(process.env.SHEET_ID as string, {
  credentials: credentials,
  languages: ['zhTW', 'enUS', 'jaJP']
});

export const folderPath = resolve(__dirname, '../../src/locales');

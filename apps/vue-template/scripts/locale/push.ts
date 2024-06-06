import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { push } from '@pnpm-monorepo-vue/scripts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const folderPath = resolve(__dirname, '../../src/locales');

push(folderPath);

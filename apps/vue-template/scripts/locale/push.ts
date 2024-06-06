import { resolve } from 'node:path';
import { i18nToolkit } from './index';

const folderPath = resolve(__dirname, '../locales');

i18nToolkit.push({ folderPath, sheetName: 'template' }).then(() => {
  console.log('push done!');
});

import { resolve } from 'node:path';
import { i18nToolkit } from './index';

const folderPath = resolve(__dirname, '../locales');

i18nToolkit
  .pull({ folderPath, sheetName: 'template', type: 'nest' })
  .then(() => {
    console.log('pull done!');
  });

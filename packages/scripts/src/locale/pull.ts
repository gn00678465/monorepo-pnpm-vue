import { createRequire } from 'module';
import { SHEET_ID, languages, auth } from './config';

export async function pull(folderPath: string) {
  const require = createRequire(import.meta.url);
  const { GoogleSheetLanguagesModel } = require('google-sheet-languages-model');

  const googleSheetLanguagesModel = new GoogleSheetLanguagesModel({
    sheetId: SHEET_ID,
    auth
  });

  const languagesModel = await googleSheetLanguagesModel.loadFromGoogleSheet(
    'template',
    languages
  );

  languagesModel.saveToFolder(folderPath, 'nest');

  console.log('pull done');
}

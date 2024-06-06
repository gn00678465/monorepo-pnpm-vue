import { createRequire } from 'module';
import { SHEET_ID, languages, auth } from './config';

export async function push(folderPath: string) {
  const require = createRequire(import.meta.url);
  const { GoogleSheetLanguagesModel } = require('google-sheet-languages-model');

  const languagesModel = GoogleSheetLanguagesModel.loadFromFolder(
    folderPath,
    languages
  );

  const googleSheetLanguagesModel = new GoogleSheetLanguagesModel({
    sheetId: SHEET_ID,
    auth
  });

  await googleSheetLanguagesModel.saveToGoogleSheet('template', languagesModel);

  console.log('push done');
}

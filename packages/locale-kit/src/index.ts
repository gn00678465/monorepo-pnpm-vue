import { google, type Auth } from 'googleapis';
import {
  GoogleSheetLanguagesModel,
  type LanguagesModel
} from 'google-sheet-languages-model';
import type {
  I18NToolkitOptions,
  I18NToolkitPushOptions,
  I18NToolkitPullOptions
} from './types';

class I18nToolkit {
  private auth: Auth.GoogleAuth;
  private languages: string[];
  private googleSheetLanguagesModel: GoogleSheetLanguagesModel | null;

  constructor({
    sheetId,
    credentials,
    languages = ['en', 'zh']
  }: I18NToolkitOptions) {
    this.languages = languages;
    this.auth = new google.auth.GoogleAuth({
      credentials,
      scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });
    this.googleSheetLanguagesModel = null;

    this.init().then((GoogleSheetLanguagesModel) => {
      this.googleSheetLanguagesModel = new GoogleSheetLanguagesModel({
        sheetId: sheetId,
        auth: this.auth
      });
    });
  }

  async init() {
    const { GoogleSheetLanguagesModel } = await import(
      'google-sheet-languages-model'
    );
    return GoogleSheetLanguagesModel;
  }

  private languagesModel(folderPath: string): LanguagesModel {
    return GoogleSheetLanguagesModel.loadFromFolder(folderPath, this.languages);
  }

  async pull({
    folderPath,
    sheetName,
    type = 'nest'
  }: I18NToolkitPullOptions): Promise<void> {
    const languagesModel =
      await this.googleSheetLanguagesModel?.loadFromGoogleSheet(
        sheetName,
        this.languages
      );

    languagesModel?.saveToFolder(folderPath, type);
  }

  async push({ sheetName, folderPath }: I18NToolkitPushOptions) {
    await this.googleSheetLanguagesModel?.saveToGoogleSheet(
      sheetName,
      this.languagesModel(folderPath)
    );
  }
}

export { I18nToolkit };

export type {
  I18NToolkitOptions,
  I18NToolkitPushOptions,
  I18NToolkitPullOptions
};

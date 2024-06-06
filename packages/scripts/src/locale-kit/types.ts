export interface LocaleKitOptions {
  credentials: any;
  languages: string[];
}

export type LanguagesContentType = 'nest' | 'flat';

export interface LocaleKitPushOptions {
  folderPath: string;
  sheetName: string;
}

export interface LocaleKitPullOptions extends LocaleKitPushOptions {
  type?: LanguagesContentType;
}

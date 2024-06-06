export interface I18NToolkitOptions {
  sheetId: string;
  languages?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  credentials: object;
}

export type LanguagesContentType = 'nest' | 'flat';

export interface I18NToolkitPushOptions {
  folderPath: string;
  sheetName: string;
}

export interface I18NToolkitPullOptions extends I18NToolkitPushOptions {
  type?: LanguagesContentType;
}

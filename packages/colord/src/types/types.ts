/** 顏色設定名稱 */
export type ThemeConfigColorKey =
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

/**
 * 主題顏色設定
 */
export type ThemeConfigColor = Record<ThemeConfigColorKey, string>;

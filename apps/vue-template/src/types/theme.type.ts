export type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error';

export type ColorTypeCase = Capitalize<ColorType>;

export type ColorScene = '' | 'suppl' | 'hover' | 'pressed';

export type ColorSceneCase = Capitalize<ColorScene>;

export type ButtonColorScene = '' | 'hover' | 'pressed' | 'focus' | 'disabled';

export type ButtonColorSceneCase = Capitalize<ButtonColorScene>;

export type ThemeConfig = {
  [key in ColorType]: string;
};

import { generate } from '@ant-design/colors';
import { type GlobalThemeOverrides, commonDark } from 'naive-ui';
import type { ThemeConfig, ColorType, ColorSceneCase } from '../../../types';

type ColorKey = `${ColorType}Color${ColorSceneCase}`;
type ThemeColor = Partial<Record<ColorKey, string>>;

interface ColorAction {
  scene: ColorSceneCase;
  handler: (color: string) => string;
}

/**
 * 依據傳入的顏色產生色系
 *
 * @param {string} color
 * @param {boolean} darkMode
 * @return {string[]}
 */
export function getGenerateColors(color: string, darkMode: boolean): string[] {
  return darkMode
    ? generate(color, {
        theme: 'dark',
        backgroundColor: commonDark.bodyColor
      })
    : generate(color);
}

/**
 * NaiveUI theme color
 *
 * @param {ThemeConfig} config store themeConfig
 * @param {boolean} darkMode
 * @return {ThemeColor}
 */
export function getThemeColors(
  config: ThemeConfig,
  darkMode: boolean
): ThemeColor {
  const themeColor: ThemeColor = {};
  const keys = Object.keys(config) as ColorType[];

  const colorActions: ColorAction[] = [
    { scene: '', handler: (color) => getGenerateColors(color, darkMode)[5] },
    {
      scene: 'Hover',
      handler: (color) => getGenerateColors(color, darkMode)[4]
    },
    {
      scene: 'Suppl',
      handler: (color) => getGenerateColors(color, darkMode)[4]
    },
    {
      scene: 'Pressed',
      handler: (color) => getGenerateColors(color, darkMode)[6]
    }
  ];

  keys.forEach((key) => {
    colorActions.forEach((action) => {
      const color = action.handler(config[key]!);
      const colorKey = `${key}Color${action.scene}` as ColorKey;
      themeColor[colorKey] = color;
    });
  });
  return themeColor;
}

/**
 * 获取动态主题ThemeOverrides
 *
 * @param {ThemeConfig} config store themeConfig
 * @param {boolean} darkMode 暗黑模式
 * @return {GlobalThemeOverrides}
 */
export function getThemeOverrides(
  config: ThemeConfig,
  darkMode: boolean
): GlobalThemeOverrides {
  const themeColors = getThemeColors(config, darkMode);
  // addCssVarsToHtml(config, darkMode, themeColors)
  return {
    common: {
      ...themeColors
    }
  };
}

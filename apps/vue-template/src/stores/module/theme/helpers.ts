import { generate } from '@ant-design/colors';
import { type GlobalThemeOverrides, commonDark } from 'naive-ui';
import { kebabCase } from 'lodash-es';
import { getRgb } from '@pnpm-monorepo-vue/colord';
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
 * get ThemeOverrides
 *
 * @param {ThemeConfig} config store themeConfig
 * @param {boolean} darkMode 黑暗模式
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

type CssObject = {
  [key: string]: string;
};

/**
 * 解析 css 變數為 object
 * @param {string} cssText "--primary-color1: 211,224,215;--primary-color2: 167,212,182;"
 * @return {CssObject} { --primary-color1: '211,224,215', --primary-color2: '167,212,182' }
 */
export function parseCssText(cssText: string): CssObject {
  const cssObj: CssObject = {};
  cssText.split(';').forEach((rule) => {
    if (rule) {
      const [key, value] = rule.split(':');
      cssObj[key.trim()] = value.trim();
    }
  });
  return cssObj;
}

/**
 *
 * @param {NTheme.Config} config - store themeConfig
 * @param {boolean} darkMode - 暗黑模式
 * @param {ThemeColor} themeColors - getThemeColors返回的颜色列表
 * @return {void}
 */
export function addCssVarsToHtml(
  config: ThemeConfig,
  darkMode: boolean,
  themeColors: ThemeColor
): void {
  const $root: HTMLElement = document.documentElement;
  const cssText = $root.style.cssText;
  const cssObj = parseCssText(cssText);
  const configCssObj: CssObject = {};
  const configEntries = Object.entries(config) as [ColorType, string][];
  const themeColorsEntries = Object.entries(themeColors) as [
    ColorKey,
    string
  ][];

  for (const [key, value] of themeColorsEntries) {
    const { r, g, b } = getRgb(value);
    configCssObj[`--n-${kebabCase(key)}`] = `${r},${g},${b}`;
  }

  for (const [key, value] of configEntries) {
    const generateColors = getGenerateColors(value, darkMode);
    generateColors.map((color, index) => {
      const { r, g, b } = getRgb(color);
      configCssObj[`--n-${key}-color-${index + 1}`] = `${r},${g},${b}`;
    });
  }

  const newCssText = Object.entries({
    ...cssObj,
    ...configCssObj
  })
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');

  $root.style.cssText = newCssText;
}

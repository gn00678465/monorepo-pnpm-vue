import { type GlobalThemeOverrides } from 'naive-ui';
import {
  getGenerateColors,
  type getGenerateColorsOptions
} from '@pnpm-monorepo-vue/colord';
import type { ThemeConfig, ColorType, ColorSceneCase } from '../../../types';

type NColorKey = `${ColorType}Color${ColorSceneCase}`;
type NThemeColor = Partial<Record<NColorKey, string>>;

interface ColorAction {
  scene: ColorSceneCase;
  handler: (color: string) => string;
}

/**
 * get Naive ThemeOverrides
 *
 * @param {ThemeConfig} config store themeConfig
 * @param {boolean} options.darkMode - 黑暗模式
 * @param {string} [options.backgroundColor] - background color in dark mode
 * @return {GlobalThemeOverrides}
 */
export function getNThemeOverrides(
  config: ThemeConfig,
  options: getGenerateColorsOptions
): GlobalThemeOverrides {
  const themeColors = getNThemeColors(config, options);
  return {
    common: {
      ...themeColors
    }
  };
}

/**
 * NaiveUI theme color
 *
 * @param {ThemeConfig} config store themeConfig
 * @param {boolean} options.darkMode - 黑暗模式
 * @param {string} [options.backgroundColor] - background color in dark mode
 * @return {ThemeColor}
 */
export function getNThemeColors(
  config: ThemeConfig,
  options: getGenerateColorsOptions
): NThemeColor {
  const themeColor: NThemeColor = {};
  const keys = Object.keys(config) as ColorType[];

  const colorActions: ColorAction[] = [
    { scene: '', handler: (color) => getGenerateColors(color, options)[5] },
    {
      scene: 'Hover',
      handler: (color) => getGenerateColors(color, options)[4]
    },
    {
      scene: 'Suppl',
      handler: (color) => getGenerateColors(color, options)[4]
    },
    {
      scene: 'Pressed',
      handler: (color) => getGenerateColors(color, options)[6]
    }
  ];

  keys.forEach((key) => {
    colorActions.forEach((action) => {
      const color = action.handler(config[key]);
      const colorKey = `${key}Color${action.scene}` as NColorKey;
      themeColor[colorKey] = color;
    });
  });
  return themeColor;
}

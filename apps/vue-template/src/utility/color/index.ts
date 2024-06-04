import { getRgb } from '@pnpm-monorepo-vue/colord';
import type { ColorType, ColorScene } from '../../types';

const colorTypes: ColorType[] = [
  'primary',
  'info',
  'success',
  'warning',
  'error'
];
const colorScenes: ColorScene[] = ['hover', 'pressed', 'suppl'];

export const colorCombinationKeys = generateColorCombinationKeys(
  colorTypes,
  colorScenes
);

export function camelCaseKey(str: string): string {
  const words = str.split('-');
  return words
    .map((word, index) => {
      if (index === 0) {
        return word + 'Color';
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

export function getRgbToString(str: string): string {
  const { r, g, b } = getRgb(str);
  return [r, g, b].join(',');
}

// ---

export function generateColorCombinationKeys<
  T extends string,
  S extends string
>(type: T[], scene: S[]): (T | `${T}-${S}`)[] {
  const colorTypes: T[] = type;
  const colorScenes: S[] = scene;
  const result: `${T}-${S}`[] = [];
  for (const t of colorTypes) {
    for (const s of colorScenes) {
      result.push(`${t}-${s}`);
    }
  }
  return [...colorTypes, ...result];
}

interface GenerateColorCombinationOptions {
  keyHandler?: (arg: string) => string;
  valueHandler?: (arg: string) => string;
  prefix?: string;
}

/**
 * Generate color combinations based on provided theme variables.
 *
 * @param {Array<string>} keys - Array of keys to generate color combinations for.
 * @param {Record<string, string>} themeVars - Theme variables to use for color combinations.
 * @param {GenerateColorCombinationOptions} [options] - Options for generating color combinations.
 * @param {(arg: string) => string} [options.keyHandler] - 處理 keys
 * @param {(arg: string) => string} [options.valueHandler] - 處理 value
 * @param {string} [options.prefix] - key 的前綴
 * @returns {Record<string, string>} Color combinations.
 */
export function generateColorCombination<
  O extends Record<string, string>,
  K extends string = string
>(
  keys: K[],
  themeVars: O,
  options: GenerateColorCombinationOptions = {}
): Record<string, string> {
  const {
    keyHandler = (arg) => arg,
    valueHandler = (arg) => arg,
    prefix = ''
  } = options;

  const result: { [P in `${typeof prefix}${K}`]?: string } = {};

  for (const k of keys) {
    const camelK = keyHandler(k) as keyof O;
    if (camelK in themeVars) {
      result[`${prefix}${k}`] = valueHandler(themeVars[camelK]);
    }
  }

  return result as {
    [P in keyof typeof result]-?: NonNullable<(typeof result)[P]>;
  };
}

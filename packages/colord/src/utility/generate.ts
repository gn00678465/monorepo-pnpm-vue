import { generate } from '@ant-design/colors';

interface getGenerateColorsLight {
  darkMode: false;
}
interface getGenerateColorsDark {
  darkMode: true;
  backgroundColor?: string;
}
export type getGenerateColorsOptions =
  | getGenerateColorsLight
  | getGenerateColorsDark;

/**
 * 依據顏色產生色系
 *
 * @param {string} color #1890ff
 * @param {boolean} options.darkMode - 黑暗模式
 * @param {string} [options.backgroundColor] - 暗黑色系產生的背景色
 * @return {string[]} ['#E6F7FF', '#BAE7FF', '#91D5FF', ''#69C0FF', '#40A9FF', '#1890FF', '#096DD9', '#0050B3', '#003A8C', '#002766']
 */
export function getGenerateColors(
  color: string,
  options: getGenerateColorsOptions
): string[] {
  return options.darkMode
    ? generate(color, {
        theme: 'dark',
        backgroundColor: options.backgroundColor
      })
    : generate(color);
}

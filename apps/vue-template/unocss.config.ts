import { defineConfig, mergeDeep } from 'unocss';
import { config } from '@pnpm-monorepo-vue/unocss';

function generateColorCombinationKeys() {
  const colorTypes = ['primary', 'info', 'success', 'warning', 'error'];
  const colorScenes = ['hover', 'pressed', 'suppl'];
  const result: string[] = [];
  for (const t of colorTypes) {
    for (const s of colorScenes) {
      result.push(`${t}-${s}`);
    }
  }
  return [...colorTypes, ...result];
}

function generateColorCombination() {
  const keys = generateColorCombinationKeys();
  const result: { string?: string } = {};

  for (const k of keys) {
    result[k] = `rgba(var(--${k}))`;
  }

  return result;
}

export default defineConfig(
  mergeDeep(config, { theme: { colors: { ...generateColorCombination() } } })
);

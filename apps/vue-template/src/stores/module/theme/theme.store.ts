import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import { darkTheme } from 'naive-ui';
import {
  useColorMode,
  useCycleList,
  type BasicColorSchema
} from '@vueuse/core';
import { getGenerateColors, getThemeOverrides } from './helpers';
import type { ThemeConfig, ColorType } from '../../../types';

export const useThemeStore = defineStore('theme-store', () => {
  const defaultMode = ref<BasicColorSchema>('auto');
  const modeList = ref<BasicColorSchema[]>(['dark', 'light', 'auto']);

  const colorMode = useColorMode({
    initialValue: defaultMode.value,
    emitAuto: true
  });

  const { state, next } = useCycleList(modeList, {
    initialValue: colorMode
  });

  watch(
    state,
    () => {
      if (!modeList.value.includes(state.value)) {
        state.value = defaultMode.value;
      }
      colorMode.value = state.value as BasicColorSchema;
    },
    { immediate: true }
  );

  /** dark mode */
  const darkMode = computed(() => {
    const { system, store } = colorMode;
    if (state.value === 'auto') {
      return system.value === 'dark';
    }
    return store.value === 'dark';
  });

  /** theme config */
  const themeConfig = ref<ThemeConfig>({
    primary: '#1677ff',
    info: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d'
  });

  /** theme */
  const theme = computed(() => (darkMode.value ? darkTheme : null));

  /** 主題顏色 */
  const themeColors = computed(() => {
    const entries = Object.entries(themeConfig.value) as [ColorType, string][];
    const colors = {} as Record<ColorType, string[]>;
    entries.forEach(([key, value]) => {
      colors[key] = getGenerateColors(value, darkMode.value);
    });
    return colors;
  });

  /** theme-overrides */
  const themeOverrides = computed(() => {
    return getThemeOverrides(themeConfig.value, darkMode.value);
  });

  /** toggle dark mode */
  function toggleDarkMode() {
    next();
  }

  return { theme, themeOverrides, darkMode, toggleDarkMode, themeColors };
});

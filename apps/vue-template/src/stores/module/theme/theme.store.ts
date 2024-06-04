import {
  ref,
  computed,
  reactive,
  effectScope,
  onScopeDispose,
  watch
} from 'vue';
import { defineStore } from 'pinia';
import { darkTheme, commonDark, type GlobalThemeOverrides } from 'naive-ui';
import type { AdminLayoutProps } from '@pnpm-monorepo-vue/materials';
import { getGenerateColors, addCssVarsToRoot } from '@pnpm-monorepo-vue/colord';
import { getNThemeOverrides } from './helpers';
import type { ThemeConfig, ColorType } from '../../../types';
import { useDarkMode } from './useDarkMode';
import {
  colorCombinationKeys,
  generateColorCombination,
  getRgbToString,
  camelCaseKey
} from '../../../utility';

export const useThemeStore = defineStore('theme-store', () => {
  const scope = effectScope();
  const layoutMode = ref<AdminLayoutProps['mode']>('vertical');
  const header = reactive({
    height: 50,
    breadcrumb: {
      visible: true,
      showIcon: true
    }
  });

  /** dark mode */
  const { darkMode, toggleDarkMode } = useDarkMode();

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
      colors[key] = getGenerateColors(value, {
        darkMode: darkMode.value,
        backgroundColor: commonDark.bodyColor
      });
    });
    return colors;
  });

  /** theme-overrides */
  const themeOverrides = computed(() => {
    return getNThemeOverrides(themeConfig.value, {
      darkMode: darkMode.value,
      backgroundColor: commonDark.bodyColor
    });
  });

  scope.run(() => {
    watch(
      themeOverrides,
      (newTheme) => {
        const { common } = newTheme;
        if (!common) return;
        const colors = generateColorCombination<
          NonNullable<GlobalThemeOverrides['common']>
        >(colorCombinationKeys, common, {
          keyHandler: camelCaseKey,
          valueHandler: getRgbToString,
          prefix: '--'
        });
        addCssVarsToRoot(colors);
      },
      { immediate: true }
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });

  return {
    // dark mode
    darkMode,
    toggleDarkMode,
    // theme
    theme,
    themeOverrides,
    themeColors,
    // layout
    layoutMode,
    header
  };
});

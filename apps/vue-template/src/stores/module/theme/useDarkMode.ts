import { ref, watch, computed, onScopeDispose, effectScope } from 'vue';
import {
  useColorMode,
  useCycleList,
  type BasicColorSchema
} from '@vueuse/core';

export function useDarkMode() {
  const defaultMode = ref<BasicColorSchema>('auto');
  const modeList = ref<BasicColorSchema[]>(['dark', 'light', 'auto']);
  const scope = effectScope();

  const colorMode = useColorMode({
    initialValue: defaultMode.value,
    emitAuto: true
  });

  const { state, next } = useCycleList(modeList, {
    initialValue: colorMode
  });

  scope.run(() => {
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
  });

  /** dark mode */
  const darkMode = computed(() => {
    const { system, store } = colorMode;
    if (state.value === 'auto') {
      return system.value === 'dark';
    }
    return store.value === 'dark';
  });

  /** toggle dark mode */
  function toggleDarkMode() {
    next();
  }

  onScopeDispose(() => {
    scope.stop();
  });

  return {
    darkMode,
    toggleDarkMode
  };
}

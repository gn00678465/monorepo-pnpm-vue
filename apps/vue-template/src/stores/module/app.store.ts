import { computed, reactive, toRefs, ref } from 'vue';
import { defineStore } from 'pinia';
import { routes } from 'vue-router/auto-routes';
import type { RouteRecordRaw } from 'vue-router/auto';
import type { MenuOption } from 'naive-ui';
import { transVueRoutesToMenu } from '@pnpm-monorepo-vue/utility';
import { addPartialProps } from '../../utility';

export const useAppStore = defineStore('app-store', () => {
  const treeMenus = computed(() => {
    const adminPaths =
      routes.find((route) => route.path === '/admin')?.children ?? [];
    return transVueRoutesToMenu<RouteRecordRaw, MenuOption>(adminPaths, {
      transform: addPartialProps
    });
  });

  const sidebarWidth = ref(240);
  const sidebarCollapsedWidth = ref(64);
  const sidebarCollapse = ref(false);

  const result = reactive({
    treeMenus,
    sidebarWidth,
    sidebarCollapsedWidth,
    sidebarCollapse
  });

  return {
    ...toRefs(result)
  };
});

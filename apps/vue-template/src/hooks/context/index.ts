import { computed } from 'vue';
import { createInjectionState } from '@vueuse/core';
import { routes } from 'vue-router/auto-routes';
import { transVueRoutesToMenu } from '@pnpm-monorepo-vue/utility';
import { addPartialProps } from '../../utility';
import type { RouteRecordRaw } from 'vue-router/auto';
import type { MenuOption } from 'naive-ui';

const [useProvideMenuStore, useMenuStore] = createInjectionState(
  () => {
    const treeMenus = computed(() => {
      const adminPaths =
        routes.find((route) => route.path === '/admin')?.children ?? [];
      return transVueRoutesToMenu<RouteRecordRaw, MenuOption>(adminPaths, {
        transform: addPartialProps
      }) as MenuOption[];
    });

    return { treeMenus };
  },
  { injectionKey: 'tree-menus' }
);

export { useProvideMenuStore, useMenuStore };

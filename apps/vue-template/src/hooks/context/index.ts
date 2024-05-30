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
        transform: addPartialProps,
        sortRoutes: sortRoutes
      }) as MenuOption[];
    });

    /**
     * 依據 meta 內設定的 sort: number 做排序
     * @param route
     * @returns
     */
    function sortRoutes(routes: RouteRecordRaw[]) {
      return routes.sort((a, b) => {
        if (getSort(a) < getSort(b)) return -1;
        if (getSort(a) > getSort(b)) return 1;
        return 0;
      });
    }

    /**
     * 取得 meta 內設定的 sort: number 未設定回傳 1
     * @param route
     * @returns
     */
    function getSort(route: RouteRecordRaw): number {
      if (typeof route.meta?.['sort'] === 'string')
        return parseInt(route.meta?.['sort']);
      if (typeof route.meta?.['sort'] === 'number') return route.meta?.['sort'];
      return 1;
    }

    return { treeMenus };
  },
  { injectionKey: 'tree-menus' }
);

export { useProvideMenuStore, useMenuStore };

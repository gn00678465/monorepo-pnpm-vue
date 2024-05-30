import type { VNodeChild } from 'vue';
import type { RouteRecordRaw } from 'vue-router/auto';
import type { MenuOption } from 'naive-ui';
import { addPartialProps } from '../menu';

/**
 * Get breadcrumbs by route
 *
 * @param route
 * @param menus
 */

export interface BreadcrumbOption extends Omit<MenuOption, 'children'> {
  key?: string | number;
  title?: string | (() => VNodeChild);
  label?: string | (() => VNodeChild);
  options?: BreadcrumbOption[];
}

export function getBreadcrumbsByRoute(
  route: RouteRecordRaw,
  menus: MenuOption[]
): BreadcrumbOption[] {
  const key = route.name as string;
  const activeKey = route.meta?.activeMenu;

  const menuKey = activeKey || key;

  for (const menu of menus) {
    if (menu.key === menuKey) {
      const breadcrumbMenu =
        menuKey !== activeKey ? menu : addPartialProps(route);

      return [transformMenuToBreadcrumb(breadcrumbMenu)];
    }

    if (menu.children?.length) {
      const result = getBreadcrumbsByRoute(route, menu.children);
      if (result.length > 0) {
        return [transformMenuToBreadcrumb(menu), ...result];
      }
    }
  }

  return [];
}

/**
 * Transform menu to breadcrumb
 *
 * @param menu
 */
function transformMenuToBreadcrumb(menu: MenuOption) {
  const { children, ...rest } = menu;

  const breadcrumb: BreadcrumbOption = {
    ...rest
  };

  if (children?.length) {
    breadcrumb.options = children.map(transformMenuToBreadcrumb);
  }

  return breadcrumb;
}

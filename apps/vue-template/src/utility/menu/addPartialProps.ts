import { h } from 'vue';
import type { RouteRecordRaw, RouteMeta } from 'vue-router/auto';
import type { MenuOption } from 'naive-ui';
import { Icon } from '@iconify/vue';
import { isFunction, isNumber, isString } from '../is';

/**
 * 將 vue-route 的設定轉為 NaiveUI 的 menu 格式
 * @param route
 * @returns
 */
export function addPartialProps(route: RouteRecordRaw): MenuOption {
  const { meta, children } = route;

  const item: MenuOption = {
    label: meta?.['title'] || String(route.path).replace('/', ''),
    key: String(route.name)
  };

  /** render Icon */
  renderIcon(meta, item);

  if (children && children.length) {
    Object.assign(item, { children: children.map(addPartialProps) });
  }

  return item;
}

/**
 * 取得 meta 內設定的 icon 處理後匯入 item menu 內
 * @param meta
 * @returns
 */
function renderIcon(meta: RouteMeta | undefined, item: MenuOption) {
  const iconSize = getIconSize(meta);

  if (meta && 'icon' in meta && isFunction(meta?.['icon'])) {
    Object.assign(item, { icon: meta['icon'], size: iconSize });
  }
  if (meta && 'icon' in meta && isString(meta?.['icon'])) {
    Object.assign(item, {
      icon: () => h(Icon, { icon: String(meta['icon']), height: iconSize })
    });
  }
}

function getIconSize(meta: RouteMeta | undefined): number | undefined {
  const iconSize = meta?.['iconSize'];
  if (isNumber(iconSize)) return Number(iconSize);
  return undefined;
}

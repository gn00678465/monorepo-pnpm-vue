import type { MenuOption } from 'naive-ui';
import type { RouteNamedMap } from 'vue-router/auto-routes';

/**
 * Get selected menu key path
 *
 * @param selectedKey Selected menu key
 */
export function getSelectedMenuKeyPath(
  selectedKey: string,
  menus: MenuOption[]
) {
  return getSelectedMenuKeyPathByKey(selectedKey, menus);
}

/**
 * Find menu path
 *
 * @param targetKey Target menu key
 * @param menu Menu
 */
function findMenuPath(targetKey: string, menu: MenuOption): string[] | null {
  const path: string[] = [];

  function dfs(item: MenuOption): boolean {
    if (hasKey(item)) {
      path.push(item.key);
    }

    if (item.key === targetKey) {
      return true;
    }

    if (item.children) {
      for (const child of item.children) {
        if (dfs(child)) {
          return true;
        }
      }
    }

    path.pop();

    return false;
  }

  if (dfs(menu)) {
    return path;
  }

  return null;
}

function hasKey(menu: MenuOption): menu is MenuOption & { key: string } {
  return 'key' in menu;
}

/**
 * Get selected menu key path
 *
 * @param selectedKey
 * @param menus
 */
function getSelectedMenuKeyPathByKey(selectedKey: string, menus: MenuOption[]) {
  const keyPath: string[] = [];

  menus.some((menu) => {
    const path = findMenuPath(selectedKey, menu);

    const find = Boolean(path?.length);

    if (find && path) {
      keyPath.push(...path);
    }

    return find;
  });

  return keyPath;
}

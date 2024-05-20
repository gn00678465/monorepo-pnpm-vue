/* eslint-disable @typescript-eslint/no-explicit-any */

type MenuRecordSingle = Record<string, any>;

type MenuRecordSingleWithChildren = MenuRecordSingle & {
  children: MenuRecordSingleWithChildren;
};

type MenuRecordRaw = MenuRecordSingle | MenuRecordSingleWithChildren;

export interface TransVueRoutesToNMenuOptions<
  RouteType extends { children?: RouteType[] },
  MenuType
> {
  checkPagePermissions?: (route: RouteType) => boolean;
  checkPageHideInMenu?: (route: RouteType) => boolean;
  sortRoutes?: (arg: RouteType[]) => RouteType[];
  transform?: (route: RouteType) => MenuType;
}

export function transVueRoutesToMenu<
  RouteType extends { children?: RouteType[] },
  MenuType extends MenuRecordRaw = any
>(
  routes?: RouteType[],
  options: TransVueRoutesToNMenuOptions<RouteType, MenuType> = {}
) {
  const { sortRoutes = (arg) => arg } = options;

  if (!routes) return [];
  return sortRoutes(routes).flatMap((route) =>
    transVueRouteToMenu<RouteType, MenuType>(route, options)
  );
}

function transVueRouteToMenu<
  RouteType extends { children?: RouteType[] },
  MenuType extends MenuRecordRaw = any
>(
  route: RouteType,
  options: TransVueRoutesToNMenuOptions<RouteType, MenuType> = {}
) {
  const {
    checkPageHideInMenu = () => false,
    checkPagePermissions = () => true,
    sortRoutes = (arg) => arg,
    transform = (arg) => arg
  } = options;

  const routes: (MenuType | RouteType)[] = [];
  const { children = [], ...rest } = route;
  let _route = transform({
    ...rest
  } as RouteType);

  /** 處理是否隱藏頁面 */
  if (checkPageHideInMenu(route)) return routes;

  /** 處理特定頁面權限 */
  if (!checkPagePermissions(route)) return routes;

  /** 處理 children */
  if (Array.isArray(children) && children.length) {
    const childRoutes = sortRoutes(children).flatMap((child) =>
      transVueRouteToMenu(child, options)
    );

    if (childRoutes.length === 1) {
      _route = childRoutes[0];
    } else {
      _route.children = childRoutes;
    }
  }

  routes.unshift(_route);
  return routes as MenuType[];
}

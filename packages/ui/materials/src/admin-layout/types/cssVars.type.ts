import type { AdminLayoutProps } from './props.type';
import type { KebabCase } from './KebabCase';

export type CssVarsProps = Pick<
  AdminLayoutProps,
  | 'headerHeight'
  | 'tabHeight'
  | 'sidebarWidth'
  | 'sidebarCollapsedWidth'
  | 'footerHeight'
> & {
  headerZIndex?: number;
  tabZIndex?: number;
  sidebarZIndex?: number;
  mobileSidebarZIndex?: number;
  footerZIndex?: number;
};

export type CssVars = {
  [K in keyof CssVarsProps as `--${KebabCase<K>}`]: string | number;
};

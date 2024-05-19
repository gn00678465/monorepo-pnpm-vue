import { LAYOUT_MAX_Z_INDEX } from './constants';
import type { CssVarsProps, CssVars, AdminLayoutProps } from './types';

function createCssVars(props: CssVarsProps) {
  const cssVars: CssVars = {
    '--header-height': `${props.headerHeight}px`,
    '--tab-height': `${props.tabHeight}px`,
    '--sidebar-width': `${props.sidebarWidth}px`,
    '--sidebar-collapsed-width': `${props.sidebarCollapsedWidth}px`,
    '--footer-height': `${props.footerHeight}px`,
    '--sidebar-z-index': `${props.sidebarZIndex}`,
    '--mobile-sidebar-z-index': `${props.mobileSidebarZIndex}`
  };

  return cssVars;
}

export function createAdminLayoutCssVars(props: AdminLayoutProps) {
  const {
    mode,
    isMobile,
    headerHeight,
    tabHeight,
    sidebarWidth,
    sidebarCollapsedWidth,
    footerHeight,
    maxZIndex = LAYOUT_MAX_Z_INDEX
  } = props;

  const headerZIndex = maxZIndex - 3;
  const tabZIndex = maxZIndex - 5;
  const sidebarZIndex =
    mode === 'vertical' || isMobile ? maxZIndex - 1 : maxZIndex - 4;
  const mobileSidebarZIndex = isMobile ? maxZIndex - 2 : 0;
  const footerZIndex = maxZIndex - 5;

  const cssProps: CssVarsProps = {
    headerHeight,
    tabHeight,
    sidebarWidth,
    sidebarCollapsedWidth,
    footerHeight,
    headerZIndex,
    tabZIndex,
    sidebarZIndex,
    mobileSidebarZIndex,
    footerZIndex
  };

  return createCssVars(cssProps);
}

interface HeaderConfig {
  headerVisible?: boolean;
  headerClass?: string;
  headerHeight?: number;
}

interface TabConfig {
  tabVisible?: boolean;
  tabClass?: string;
  tabHeight?: number;
}

export interface SidebarConfig {
  sidebarVisible?: boolean;
  sidebarClass?: string;
  sidebarCollapse?: boolean;
  sidebarWidth?: number;
  sidebarCollapsedWidth?: number;
}

export interface MobileSidebarConfig {
  mobileSidebarClass?: string;
  mobileSidebarCollapse?: boolean;
}

interface ContentConfig {
  contentClass?: string;
  /**
   * 當 content 是否設定為全螢幕
   * 當 content 為全螢幕其他元素會隱藏
   * @description
   */
  fullContent?: boolean;
}

interface FooterConfig {
  footerVisible?: boolean;
  fixedFooter?: boolean;
  footerClass?: string;
  footerHeight?: number;
  /**
   * layout mode 為 vertical 時
   */
  rightFooter?: boolean;
}

/**
 * layout 模式
 * - horizontal 水平
 * - vertical 垂直
 */
export type LayoutMode = 'horizontal' | 'vertical';

/**
 * 滾動模式
 * - wrapper 最外層出現滾動條
 * - content 主要內容出現滾動條
 */
export type ScrollMode = 'wrapper' | 'content';

export interface AdminLayoutProps
  extends HeaderConfig,
    TabConfig,
    SidebarConfig,
    MobileSidebarConfig,
    ContentConfig,
    FooterConfig {
  /**
   * layout 模式
   * {@link LayoutMode}
   */
  mode?: LayoutMode;
  /**
   * 滾動條模式
   * {@link ScrollMode}
   */
  scrollMode?: ScrollMode;

  scrollId?: string;
  /** The class of the scroll element */
  scrollClass?: string;
  /** The class of the scroll wrapper element */
  scrollWrapperClass?: string;
  /**
   * 是否為可攜式裝置
   */
  isMobile?: boolean;
  /**
   * 固定 header 與 tab
   * @default true
   */
  fixedTop?: boolean;
  /**
   * 通用 class
   * - 可以用來設定 transition 樣式
   * @default 'transition-all-300'
   */
  commonClass?: string;
  /**
   * The max z-index of the layout
   */
  maxZIndex?: number;
}

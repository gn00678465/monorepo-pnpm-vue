import type { SidebarConfig, MobileSidebarConfig } from './props.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SlotFn<T = Record<string, unknown>> = (props?: T) => any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SlotFnRequire<T = Record<string, unknown>> = (props: T) => any;

export type SidebarScopeSlotProps = Pick<
  SidebarConfig,
  'sidebarCollapse' | 'sidebarWidth' | 'sidebarCollapsedWidth'
> &
  Partial<Pick<MobileSidebarConfig, 'mobileSidebarCollapse'>>;

export type AdminLayoutSlots = {
  /** content slot */
  default?: SlotFn;
  /** header slot */
  header?: SlotFn;
  /** tab slot */
  tab?: SlotFn;
  /** sidebar slot */
  sidebar?: SlotFnRequire<SidebarScopeSlotProps>;
  /** footer slot */
  footer?: SlotFn;
};

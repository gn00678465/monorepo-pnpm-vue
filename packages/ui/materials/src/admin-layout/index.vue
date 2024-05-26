<script setup lang="ts">
import { computed, reactive, toRefs, toValue } from 'vue';
import style from './styles/index.module.css';
import { createAdminLayoutCssVars } from './helper';
import { LAYOUT_MAX_Z_INDEX } from './constants';
import type { AdminLayoutProps, AdminLayoutSlots } from './types';

defineOptions({
  name: 'AdminLayoutFrame',
  inheritAttrs: false
});

const props = withDefaults(defineProps<AdminLayoutProps>(), {
  mode: 'vertical',
  scrollMode: 'content',
  fixedTop: true,
  commonClass: 'transition-all-300',
  headerVisible: true,
  headerHeight: 50,
  tabVisible: true,
  tabHeight: 48,
  sidebarVisible: true,
  sidebarCollapse: false,
  mobileSidebarCollapse: false,
  sidebarWidth: 240,
  sidebarCollapsedWidth: 64,
  footerVisible: true,
  footerHeight: 48,
  rightFooter: false,
  maxZIndex: LAYOUT_MAX_Z_INDEX
});

const {
  commonClass,
  fullContent,
  sidebarCollapse,
  mobileSidebarCollapse,
  scrollWrapperClass
} = toRefs(props);

const emits = defineEmits<{
  'click-mobile-sidebar-mask': [];
}>();

const slots = defineSlots<AdminLayoutSlots>();

const cssVars = computed(() => createAdminLayoutCssVars(props));

type TagNames =
  | 'header'
  | 'tab'
  | 'sidebar'
  | 'mobileSidebar'
  | 'content'
  | 'footer';

const visible: Record<Exclude<TagNames, 'content'>, boolean> = reactive({
  header: computed(() => Boolean(slots.header) && props.headerVisible),
  tab: computed(() => Boolean(slots.tab) && props.tabVisible),
  sidebar: computed(
    () => !props.isMobile && Boolean(slots.sidebar) && props.sidebarVisible
  ),
  mobileSidebar: computed(
    () => props.isMobile && Boolean(slots.sidebar) && props.sidebarVisible
  ),
  footer: computed(() => Boolean(slots.footer) && props.footerVisible)
});

/** 滾動模式 */
const isWrapperScroll = computed(() => props.scrollMode === 'wrapper');
const isContentScroll = computed(() => props.scrollMode === 'content');

/** layout 模式 */
const isVertical = computed(() => props.mode === 'vertical');
const isHorizontal = computed(() => props.mode === 'horizontal');

/** fixed header adn tab */
const fixedHeaderAndTab = computed(
  () => props.fixedTop || (isHorizontal.value && isWrapperScroll.value)
);

/**
 * 各部位的基本 class
 */
const classes: Record<TagNames, (string | undefined)[]> = reactive({
  header: computed(() => [
    style['layout-header'],
    toValue(commonClass),
    props.headerClass
  ]),
  tab: computed(() => [
    style['layout-tab'],
    toValue(commonClass),
    props.tabClass
  ]),
  sidebar: computed(() => [toValue(commonClass), props.sidebarClass]),
  content: computed(() => [toValue(commonClass), props.contentClass]),
  mobileSidebar: computed(() => [
    toValue(commonClass),
    props.mobileSidebarClass
  ]),
  footer: computed(() => [
    style['layout-footer'],
    toValue(commonClass),
    props.footerClass
  ])
});

const leftGapClass: Record<
  Extract<TagNames, 'header' | 'footer'> | 'default',
  string
> = reactive({
  default: computed(() => {
    if (!props.fullContent && visible.sidebar) {
      return props.sidebarCollapse
        ? style['left-gap_collapsed']
        : style['left-gap'];
    }
    return '';
  }),
  header: computed(() => (isVertical.value ? leftGapClass.default : '')),
  footer: computed(() => {
    const condition1 = isVertical.value;
    const condition2 =
      isHorizontal.value && isWrapperScroll.value && !props.fixedFooter;
    const condition3 = Boolean(isHorizontal.value && props.rightFooter);

    if (condition1 || condition2 || condition3) {
      return leftGapClass.default;
    }
    return '';
  })
});

const sidebarPaddingClass = computed<string>(() => {
  let cls = '';

  if (visible.header && !leftGapClass.header) {
    cls += style['sidebar-padding-top'];
  }
  if (visible.footer && !leftGapClass.footer) {
    cls += ` ${style['sidebar-padding-bottom']}`;
  }

  return cls;
});

function handleClickMask() {
  emits('click-mobile-sidebar-mask');
}
</script>

<template>
  <div :style="cssVars" :class="['relative h-full', commonClass]">
    <div
      :class="[
        'flex h-full flex-col',
        commonClass,
        scrollWrapperClass,
        { 'overflow-y-auto': isWrapperScroll }
      ]"
    >
      <!-- header -->
      <template v-if="visible.header">
        <header
          v-show="!fullContent"
          :class="[
            ...classes.header,
            leftGapClass.header,
            'flex-shrink-0',
            { 'absolute left-0 top-0 w-full': fixedHeaderAndTab }
          ]"
        >
          <slot name="header"></slot>
        </header>
        <div
          v-show="!fullContent && fixedHeaderAndTab"
          :class="[
            style['layout-header-placement'],
            'flex-shrink-0 overflow-hidden'
          ]"
        ></div>
      </template>
      <!-- tab -->
      <template v-if="visible.tab">
        <nav
          v-show="!fullContent"
          :class="[
            ...classes.tab,
            leftGapClass.default,
            'flex-shrink-0',
            { 'top-0!': !visible.header },
            { 'absolute left-0 w-full': fixedHeaderAndTab }
          ]"
        >
          <slot name="tab"></slot>
        </nav>
        <div
          v-show="!fullContent && fixedHeaderAndTab"
          :class="[
            style['layout-tab-placement'],
            'flex-shrink-0 overflow-hidden'
          ]"
        ></div>
      </template>
      <!-- sidebar(desktop) -->
      <template v-if="visible.sidebar">
        <aside
          v-show="!fullContent"
          :class="[
            ...classes.sidebar,
            sidebarPaddingClass,
            'absolute left-0 top-0 h-full',
            sidebarCollapse
              ? style['layout-sidebar_collapsed']
              : style['layout-sidebar']
          ]"
        >
          <slot
            name="sidebar"
            :sidebarCollapse="sidebarCollapse"
            :sidebarWidth="props.sidebarWidth"
            :sidebarCollapsedWidth="props.sidebarCollapsedWidth"
          ></slot>
        </aside>
      </template>
      <!-- sidebar(mobile) -->
      <template v-if="visible.mobileSidebar">
        <aside
          :class="[
            ...classes.mobileSidebar,
            'absolute left-0 top-0 h-full w-0 bg-white',
            style['layout-mobile-sidebar'],
            !mobileSidebarCollapse ? 'overflow-hidden' : style['active']
          ]"
        >
          <slot
            name="sidebar"
            :sidebarCollapse="false"
            :sidebarWidth="props.sidebarWidth"
            :sidebarCollapsedWidth="props.sidebarCollapsedWidth"
            :mobileSidebarCollapse="mobileSidebarCollapse"
          ></slot>
        </aside>
        <div
          v-show="mobileSidebarCollapse"
          :class="[
            'bg-black-0.2 absolute left-0 top-0 h-full w-full',
            style['layout-mobile-sidebar-mask']
          ]"
          @click="handleClickMask"
        ></div>
      </template>
      <!-- main content -->
      <main
        :class="[
          ...classes.content,
          'flex flex-grow flex-col',
          leftGapClass.default,
          { 'overflow-y-auto': isContentScroll }
        ]"
      >
        <slot></slot>
      </main>
      <!-- footer -->
      <template v-if="visible.footer">
        <footer
          v-show="!fullContent"
          :class="[
            ...classes.footer,
            leftGapClass.footer,
            'flex-shrink-0',
            { 'absolute bottom-0 left-0 w-full': fixedFooter }
          ]"
        >
          <slot name="footer"></slot>
        </footer>
        <div
          v-show="!fullContent && fixedFooter"
          :class="[
            style['layout-footer-placement'],
            'flex-shrink-0 overflow-hidden'
          ]"
        ></div>
      </template>
    </div>
  </div>
</template>

<style scoped>
@import url('./styles/utility.css');
</style>

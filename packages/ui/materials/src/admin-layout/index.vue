<script setup lang="ts">
import { computed, reactive, toRefs } from 'vue';
import style from './styles/index.module.css';
import { createAdminLayoutCssVars } from './helper';
import { LAYOUT_MAX_Z_INDEX, LAYOUT_SCROLL_ID } from './constants';
import type { AdminLayoutProps, AdminLayoutSlots } from './types';

const props = withDefaults(defineProps<AdminLayoutProps>(), {
  mode: 'vertical',
  scrollMode: 'content',
  scrollId: LAYOUT_SCROLL_ID,
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
  headerClass,
  tabClass,
  sidebarClass,
  mobileSidebarClass,
  contentClass,
  footerClass,
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
  <div :style="cssVars" class="relative h-full" :class="[commonClass]">
    <div
      :id="isWrapperScroll ? scrollId : undefined"
      class="flex h-full flex-col"
      :class="[
        commonClass,
        scrollWrapperClass,
        { 'overflow-y-auto': isWrapperScroll }
      ]"
    >
      <!-- header -->
      <template v-if="visible.header">
        <header
          v-show="!fullContent"
          class="flex-shrink-0"
          :class="[
            style['layout-header'],
            commonClass,
            headerClass,
            leftGapClass.header,
            { 'absolute left-0 top-0 w-full': fixedHeaderAndTab }
          ]"
        >
          <slot name="header"></slot>
        </header>
        <div
          v-show="!fullContent && fixedHeaderAndTab"
          class="flex-shrink-0 overflow-hidden"
          :class="style['layout-header-placement']"
        ></div>
      </template>
      <!-- tab -->
      <template v-if="visible.tab">
        <nav
          v-show="!fullContent"
          class="flex-shrink-0"
          :class="[
            style['layout-tab'],
            commonClass,
            tabClass,
            leftGapClass.default,
            { 'top-0!': !visible.header },
            { 'absolute left-0 w-full': fixedHeaderAndTab }
          ]"
        >
          <slot name="tab"></slot>
        </nav>
        <div
          v-show="!fullContent && fixedHeaderAndTab"
          class="flex-shrink-0 overflow-hidden"
          :class="style['layout-tab-placement']"
        ></div>
      </template>
      <!-- sidebar(desktop) -->
      <template v-if="visible.sidebar">
        <aside
          v-show="!fullContent"
          class="absolute left-0 top-0 h-full"
          :class="[
            commonClass,
            sidebarClass,
            sidebarPaddingClass,
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
          class="absolute left-0 top-0 h-full w-0 bg-white"
          :class="[
            commonClass,
            mobileSidebarClass,
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
          class="bg-black-0.2 absolute left-0 top-0 h-full w-full"
          :class="[style['layout-mobile-sidebar-mask']]"
          @click="handleClickMask"
        ></div>
      </template>
      <!-- main content -->
      <main
        :id="isContentScroll ? scrollId : undefined"
        class="flex flex-grow flex-col"
        :class="[
          commonClass,
          contentClass,
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
          class="flex-shrink-0"
          :class="[
            style['layout-footer'],
            commonClass,
            footerClass,
            leftGapClass.footer,
            { 'absolute bottom-0 left-0 w-full': fixedFooter }
          ]"
        >
          <slot name="footer"></slot>
        </footer>
        <div
          v-show="!fullContent && fixedFooter"
          class="flex-shrink-0 overflow-hidden"
          :class="style['layout-footer-placement']"
        ></div>
      </template>
    </div>
  </div>
</template>

<style scoped src="./styles/style.css"></style>

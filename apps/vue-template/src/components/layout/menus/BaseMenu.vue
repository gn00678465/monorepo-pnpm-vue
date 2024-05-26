<template>
  <n-scrollbar>
    <n-menu
      v-model:expanded-keys="expandedKeys"
      :value="selectedKey"
      key-field="key"
      label-field="label"
      :options="treeMenus"
      v-bind="attrs"
      @update:value="handleClickMenu"
    ></n-menu>
  </n-scrollbar>
</template>

<script lang="ts">
export interface BaseMenuProps extends /** @vue-ignore */ MenuProps {
  mode?: AdminLayoutProps['mode'];
}
</script>

<script setup lang="ts">
import { toRefs, ref, computed, watch, useAttrs } from 'vue';
import { NMenu, type MenuProps, NScrollbar } from 'naive-ui';
import { useRoute, useRouter } from 'vue-router/auto';
import type { RouteNamedMap } from 'vue-router/auto-routes';
import { storeToRefs } from 'pinia';
import { useThemeStore, useAppStore } from '../../../stores';
import type { AdminLayoutProps } from '@pnpm-monorepo-vue/materials';
import { getSelectedMenuKeyPath } from '../../../utility';
import { useMenuStore } from '../../../hooks';

const route = useRoute();
const router = useRouter();
const props = withDefaults(defineProps<BaseMenuProps>(), {});
const attrs = useAttrs();
const { mode } = toRefs(props);
const menuStore = useMenuStore();

const { header } = storeToRefs(useThemeStore());
const { sidebarCollapse } = storeToRefs(useAppStore());

const siderCollapse = computed(
  () => mode.value === 'vertical' && sidebarCollapse.value
);

const isHorizontal = computed(() => props.mode === 'horizontal');

// menu data
const treeMenus = computed(() => menuStore?.treeMenus.value ?? []);

const expandedKeys = ref<string[]>([]);

const selectedKey = computed(() => {
  const { hideInMenu, activeMenu } = route.meta;
  const name = route.name as string;

  const routeName = (hideInMenu ? activeMenu : name) || name;

  return routeName;
});

function updateExpandedKeys() {
  if (isHorizontal.value || siderCollapse.value || !selectedKey.value) {
    expandedKeys.value = [];
    return;
  }
  expandedKeys.value = getSelectedMenuKeyPath(
    selectedKey.value,
    treeMenus.value
  );
}

function handleClickMenu(key: keyof RouteNamedMap) {
  router.push({ name: key });
}

watch(
  () => route.name,
  () => {
    updateExpandedKeys();
  },
  { immediate: true }
);
</script>

<style scoped>
:deep(.n-menu--horizontal) {
  --n-item-height: calc(v-bind(header.height) * 1px) !important;
}
</style>

<template>
  <div
    class="size-full flex flex-col items-start justify-start w-full inline-block"
  >
    <RouterLink
      v-if="showLogo"
      to="/"
      class="w-full flex-center overflow-hidden whitespace-nowrap flex-shrink-0"
      :style="{ height: headerHeight + 'px' }"
    >
      <h2
        v-show="!sidebarCollapse"
        class="pl-8px text-base font-bold transition duration-300 ease-in-out"
      >
        {{ title }}
      </h2>
    </RouterLink>
    <BaseMenu
      class="flex-grow"
      :collapsed-icon-size="24"
      :icon-size="22"
      :collapsed="sidebarCollapse"
      :collapsed-width="sidebarCollapsedWidth"
    ></BaseMenu>
    <slot v-if="showExtra" name="extra"></slot>
  </div>
</template>

<script lang="ts">
export interface AdminSidebarProps {
  showLogo?: boolean;
  title?: string;
  headerHeight?: number;
  showExtra?: boolean;
}
</script>

<script setup lang="ts">
import { toRefs } from 'vue';
import { RouterLink } from 'vue-router/auto';
import { storeToRefs } from 'pinia';
import { BaseMenu } from '../menus';
import { useAppStore } from '../../../stores';

defineOptions({
  name: 'AdminSidebar'
});

const props = withDefaults(defineProps<AdminSidebarProps>(), {
  showLogo: true,
  showTitle: true,
  showExtra: true,
  title: 'Admin Dashboard',
  headerHeight: 48
});
const { showLogo, title, showExtra, headerHeight } = toRefs(props);
const { sidebarCollapsedWidth, sidebarCollapse } = storeToRefs(useAppStore());
</script>

<style scoped></style>

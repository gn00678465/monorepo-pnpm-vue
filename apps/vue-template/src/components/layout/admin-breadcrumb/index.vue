<template>
  <NBreadcrumb v-if="header.breadcrumb.visible">
    <!-- define component start: BreadcrumbContent -->
    <DefineBreadcrumbContent v-slot="{ breadcrumb }">
      <div class="flex-y-center align-middle">
        <component
          :is="breadcrumb.icon"
          v-if="header.breadcrumb.showIcon"
          class="mr-1 text-lg"
        ></component>
        {{ breadcrumb.label }}
      </div>
    </DefineBreadcrumbContent>
    <!-- define component end: BreadcrumbContent -->

    <NBreadcrumbItem v-for="item in breadcrumbs" :key="item.key">
      <NDropdown
        v-if="item.options?.length"
        :options="item.options"
        @select="handleClickMenu"
      >
        <BreadcrumbContent :breadcrumb="item" />
      </NDropdown>
      <BreadcrumbContent v-else :breadcrumb="item" />
    </NBreadcrumbItem>
  </NBreadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter, type RouteRecordRaw } from 'vue-router/auto';
import type { RouteNamedMap } from 'vue-router/auto-routes';
import { storeToRefs } from 'pinia';
import { NBreadcrumb, NBreadcrumbItem, NDropdown } from 'naive-ui';
import { createReusableTemplate } from '@vueuse/core';
import { useThemeStore } from '../../../stores';
import { getBreadcrumbsByRoute, type BreadcrumbOption } from '../../../utility';
import { useMenuStore } from '../../../hooks';

defineOptions({
  name: 'AdminBreadcrumb'
});

const route = useRoute();
const router = useRouter();
const [DefineBreadcrumbContent, BreadcrumbContent] = createReusableTemplate<{
  breadcrumb: BreadcrumbOption;
}>();
const { header } = storeToRefs(useThemeStore());
const { treeMenus } = useMenuStore()!;

const breadcrumbs = computed(() =>
  getBreadcrumbsByRoute(route as unknown as RouteRecordRaw, treeMenus.value)
);

function handleClickMenu(key: keyof RouteNamedMap) {
  router.push({ name: key });
}
</script>

<style scoped></style>

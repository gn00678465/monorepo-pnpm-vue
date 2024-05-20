<template>
  <AdminLayout
    :sidebar-width="sidebarWidth"
    :sidebar-collapsed-width="sidebarCollapsedWidth"
    :collapsed="sidebarCollapse"
    sidebar-class="border-r bg-white shadow-md"
  >
    <template #sidebar="sidebarProps">
      <BaseMenu
        :collapsed-icon-size="24"
        :icon-size="22"
        key-field="key"
        label-field="label"
        :collapsed="sidebarProps.sidebarCollapse"
        :collapsed-width="sidebarProps.sidebarCollapsedWidth"
      ></BaseMenu>
    </template>
    <MainContent></MainContent>
  </AdminLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { AdminLayout } from '@pnpm-monorepo-vue/materials';
import { BaseMenu, MainContent } from '../components';
import { useAppStore } from '../stores';

const { sidebarCollapsedWidth, sidebarWidth, sidebarCollapse } =
  storeToRefs(useAppStore());
</script>

<style scoped></style>

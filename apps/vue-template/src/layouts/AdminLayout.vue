<template>
  <AdminLayout
    :mode="layoutMode"
    :header-height="header.height"
    :sidebar-width="sidebarWidth"
    :sidebar-collapsed-width="sidebarCollapsedWidth"
    :sidebar-collapse="sidebarCollapse"
    sidebar-class="border-r bg-white shadow-md"
    header-class="border-b bg-white"
  >
    <template #header>
      <AdminHeader></AdminHeader>
    </template>

    <template #sidebar>
      <AdminSidebar
        :mode="layoutMode"
        :headerHeight="header.height"
      ></AdminSidebar>
    </template>
    <MainContent></MainContent>
  </AdminLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { AdminLayout } from '@pnpm-monorepo-vue/materials';
import { AdminSidebar, MainContent, AdminHeader } from '../components';
import { useAppStore, useThemeStore } from '../stores';
import { useProvideMenuStore } from '../hooks';

const { sidebarCollapsedWidth, sidebarWidth, sidebarCollapse } =
  storeToRefs(useAppStore());
const { layoutMode, header } = storeToRefs(useThemeStore());

useProvideMenuStore();
</script>

<style scoped></style>

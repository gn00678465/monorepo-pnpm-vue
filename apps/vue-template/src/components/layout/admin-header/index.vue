<template>
  <div class="py-2 px-3">
    <div
      class="size-full px-4 flex items-center justify-start flex-grow gap-x-4 bg-white py-3 rounded shadow"
    >
      <MenuCollapse
        v-model:collapsed="sidebarCollapse"
        :size="20"
      ></MenuCollapse>
      <AdminBreadcrumb></AdminBreadcrumb>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../../stores';
import MenuCollapse from '../MenuCollapse.vue';
import AdminBreadcrumb from '../admin-breadcrumb/index.vue';

defineOptions({
  name: 'AdminHeader'
});

const { sidebarCollapse } = storeToRefs(useAppStore());
</script>

<style scoped></style>

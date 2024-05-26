<template>
  <div class="size-full px-4 flex items-center justify-start">
    <MenuCollapse v-model:collapsed="sidebarCollapse" :size="20"></MenuCollapse>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../../stores';
import MenuCollapse from '../MenuCollapse.vue';

defineOptions({
  name: 'AdminHeader'
});

const { sidebarCollapse } = storeToRefs(useAppStore());
</script>

<style scoped></style>

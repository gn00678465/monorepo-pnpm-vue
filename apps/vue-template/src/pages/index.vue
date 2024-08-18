<template>
  <NSplit class="p-20">
    <template #1>
      <Tree></Tree>
    </template>
  </NSplit>
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto';
import { NSplit } from 'naive-ui';
import Tree from '../components/tree/Tree.vue';

definePage({
  name: 'client_index',
  meta: {
    title: 'Client index',
    requiresAuth: false,
    hide: true,
    icon: ''
  }
});
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: ErrorLayout
</route>

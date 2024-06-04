<template>
  <div class="p-20">
    <h1 class="text-primary text-12">Index</h1>
    <n-button size="large" type="primary">Home</n-button>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui';
import { definePage } from 'vue-router/auto';

definePage({
  name: 'client_index',
  meta: {
    title: 'Client index',
    requiresAuth: false,
    hide: true
  }
});
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: ErrorLayout
</route>

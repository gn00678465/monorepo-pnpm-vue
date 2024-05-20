<template>
  <div>404</div>
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'not-found',
  meta: {
    title: 'Page Not Found',
    requiresAuth: false,
    hide: true
  }
});
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: BlankLayout
</route>

<template>
  <div></div>
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'server-error',
  meta: {
    title: 'Server Error',
    requiresAuth: false,
    hide: true,
    alias: ['500', 'server-error']
  }
});
</script>

<style scoped></style>

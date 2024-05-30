<template>
  <div></div>
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'forbidden',
  meta: {
    title: 'Forbidden',
    requiresAuth: false,
    hide: true,
    alias: ['403', 'forbidden']
  }
});
</script>

<style scoped></style>

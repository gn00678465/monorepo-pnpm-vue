<template>
  <div>Layer-1-1</div>
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'admin_layer_1-1',
  meta: {
    requiresAuth: true,
    title: 'Layer-1-1',
    icon: 'clarity:dashboard-outline-badged',
    sort: 1
  }
});
</script>

<style scoped></style>

<template>
  <div>Layer-1-2-2</div>
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'admin_layer_1_2-2',
  meta: {
    requiresAuth: true,
    title: 'Layer-1-2-2',
    icon: 'clarity:dashboard-outline-badged',
    sort: 2
  }
});
</script>

<style scoped></style>

<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { definePage, RouterView } from 'vue-router/auto';

definePage({
  name: 'admin_layer_1',
  meta: {
    requiresAuth: true,
    title: 'Layer-1',
    icon: 'clarity:dashboard-outline-badged',
    sort: 2
  }
});
</script>

<style scoped></style>

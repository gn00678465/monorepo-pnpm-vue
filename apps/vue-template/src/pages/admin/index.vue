<template>
  <NCard class="shadow"> Admin </NCard>
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto';
import { NCard } from 'naive-ui';

definePage({
  name: 'admin_index',
  meta: {
    requiresAuth: true,
    title: 'Admin index',
    icon: 'clarity:dashboard-outline-badged',
    sort: 1
  }
});
</script>

<style scoped></style>

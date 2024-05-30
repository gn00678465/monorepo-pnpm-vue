<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { definePage, RouterView } from 'vue-router/auto';

definePage({
  name: 'documents',
  meta: {
    requiresAuth: true,
    title: 'Document',
    icon: 'mdi:file-document-multiple-outline',
    sort: 2
  }
});
</script>

<style scoped></style>

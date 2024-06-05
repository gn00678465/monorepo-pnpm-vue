<template>
  <div class="h-full shadow rounded overflow-hidden">
    <iframe
      id="iframePage"
      class="size-full"
      src="https://vitejs.dev/"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'document_vite',
  meta: {
    requiresAuth: true,
    title: 'Vite',
    icon: 'logos:vitejs',
    sort: 2
  }
});
</script>

<style scoped></style>

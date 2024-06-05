<template>
  <div class="h-full shadow rounded overflow-hidden">
    <iframe
      id="iframePage"
      class="size-full"
      src="https://vueuse.org/"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'documents_vueuse',
  meta: {
    requiresAuth: true,
    title: 'VueUse',
    icon: 'logos:vueuse',
    sort: 3
  }
});
</script>

<style scoped></style>

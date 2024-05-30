<template>
  <div class="h-full">
    <iframe
      id="iframePage"
      class="size-full"
      src="https://unocss.dev/"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'document_unocss',
  meta: {
    requiresAuth: true,
    title: 'UnoCss',
    icon: 'logos:unocss',
    sort: 4
  }
});
</script>

<style scoped></style>

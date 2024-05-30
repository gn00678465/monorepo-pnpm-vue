<template>
  <div class="h-full">
    <iframe
      id="iframePage"
      class="size-full"
      src="https://zh-hk.vuejs.org/"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'documents_vue',
  meta: {
    requiresAuth: true,
    title: 'Vue',
    icon: 'logos:vue',
    sort: 1
  }
});
</script>

<style scoped></style>

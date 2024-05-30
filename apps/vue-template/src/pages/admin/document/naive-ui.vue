<template>
  <div class="h-full">
    <iframe
      id="iframePage"
      class="size-full"
      src="https://www.naiveui.com/en-US/light"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { definePage } from 'vue-router/auto';

definePage({
  name: 'document_naive-ui',
  meta: {
    requiresAuth: true,
    title: 'Naïve UI',
    icon: 'logos:naiveui',
    sort: 5
  }
});
</script>

<style scoped></style>

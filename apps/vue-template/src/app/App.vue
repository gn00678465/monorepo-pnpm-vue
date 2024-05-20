<script setup lang="ts">
import { RouterView } from 'vue-router/auto';
import { NaiveConfigProvider } from '@pnpm-monorepo-vue/naive-ui';
</script>

<template>
  <naive-config-provider
    :preflight-style-disabled="false"
    class="h-full w-full"
  >
    <RouterView />
  </naive-config-provider>
</template>

<style scoped></style>

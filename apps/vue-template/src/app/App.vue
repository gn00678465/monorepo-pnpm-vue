<script setup lang="ts">
import { RouterView } from 'vue-router/auto';
import { NaiveConfigProvider } from '@pnpm-monorepo-vue/naive-ui';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '../stores';

const { theme, themeOverrides } = storeToRefs(useThemeStore());
</script>

<template>
  <naive-config-provider
    :preflight-style-disabled="false"
    class="h-full w-full"
    :theme="theme"
    :theme-overrides="themeOverrides"
  >
    <RouterView />
  </naive-config-provider>
</template>

<style scoped></style>

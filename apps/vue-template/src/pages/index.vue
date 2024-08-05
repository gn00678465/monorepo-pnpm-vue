<template>
  <div class="p-20">
    <h1 class="text-primary text-12">Index</h1>
    <Logo />
    <n-button size="large" type="primary">{{ t('ok') }}</n-button>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui';
import { definePage } from 'vue-router/auto';
import { useI18n } from 'vue-i18n';
import Logo from 'virtual:logo';

definePage({
  name: 'client_index',
  meta: {
    title: 'Client index',
    requiresAuth: false,
    hide: true,
    icon: ''
  }
});

console.log('🚀 ~ logo:', Logo, typeof Logo);

const { t } = useI18n();
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: ErrorLayout
</route>

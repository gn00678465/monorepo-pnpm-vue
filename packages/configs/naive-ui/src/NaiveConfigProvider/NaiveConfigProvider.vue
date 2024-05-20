<template>
  <n-config-provider v-bind="attrs">
    <slot></slot>
    <n-global-style />
  </n-config-provider>
</template>

<script lang="ts">
export interface NaiveConfigProviderProps
  extends /** @vue-ignore */ ConfigProviderProps {}
</script>

<script setup lang="ts">
import { useAttrs } from 'vue';
import {
  NConfigProvider,
  NGlobalStyle,
  type ConfigProviderProps,
  type GlobalThemeOverrides
} from 'naive-ui';

const attrs = useAttrs();
</script>

<style scoped></style>

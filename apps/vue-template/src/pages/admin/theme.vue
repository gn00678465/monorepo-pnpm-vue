<template>
  <div class="p-10">
    <h3 class="mb-5 text-5xl">Color Palette</h3>
    <ul class="flex flex-col gap-y-5">
      <li v-for="(value, key) of themeColors" :key="key">
        <h4 class="mb-2 text-2xl">{{ capitalize(key) }} Color</h4>
        <ul class="flex flex-row-reverse items-center justify-end gap-x-5">
          <li class="text-center" v-for="color of value">
            <div class="h-24 w-24" :style="{ background: color }"></div>
            <p class="text-base mt-2">{{ color }}</p>
          </li>
        </ul>
      </li>
    </ul>
    <h3 class="my-5 text-5xl">Naive Theme Color</h3>
    <ul class="flex items-center gap-x-10">
      <li v-for="i of 4" :key="i">
        <ul class="space-y-5 text-center">
          <li v-for="j of 4" :key="j">
            <div
              class="h-32 w-32"
              :style="{
                background: themeOverrideEntries((j - 1) * 4 + i - 1)[1]
              }"
            ></div>
            <p class="text-base mt-2">
              {{
                themeOverrideEntries((j - 1) * 4 + i - 1)[0].replace(
                  'Color',
                  ' '
                )
              }}
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { definePage } from 'vue-router/auto';
import { storeToRefs } from 'pinia';
import { capitalize } from 'vue';
import { useThemeStore } from '../../stores';

definePage({
  name: 'admin_theme_config',
  meta: {
    requiresAuth: true,
    title: 'Theme Config',
    icon: 'clarity:dashboard-outline-badged',
    sort: 3
  }
});

const { themeColors, themeOverrides } = storeToRefs(useThemeStore());
const themeOverrideEntries = computed(
  () => (idx: number) =>
    Object.entries(Object.assign({}, themeOverrides.value.common))[idx]
);
</script>

<style scoped></style>

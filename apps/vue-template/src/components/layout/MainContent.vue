<template>
  <div class="main">
    <router-view v-slot="{ Component, route }">
      <FadeTransition>
        <keep-alive :max="30" :include="cache">
          <component :key="route.path" :is="Component" />
        </keep-alive>
      </FadeTransition>
    </router-view>
  </div>
</template>

<script lang="ts">
export type MainContentProps = {
  cache: string[];
};
</script>

<script setup lang="ts">
import { toRefs } from 'vue';
import { RouterView } from 'vue-router/auto';
import { FadeTransition } from '@pnpm-monorepo-vue/components';

const props = withDefaults(defineProps<Partial<MainContentProps>>(), {
  cache: () => []
});
const { cache } = toRefs(props);
</script>

<style scoped>
.main {
  overflow-y: auto;
  height: 100%;
}
</style>

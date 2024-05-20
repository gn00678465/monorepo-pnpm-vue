<template>
  <div class="main">
    <router-view v-slot="{ Component, route }">
      <keep-alive v-if="keepAlive" :max="30" :include="cache">
        <component :key="route.path" :is="Component" />
      </keep-alive>
      <component v-else :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts">
export type MainContentProps = {
  keepAlive: boolean;
  cache: string[];
};
</script>

<script setup lang="ts">
import { toRefs } from 'vue';
import { RouterView } from 'vue-router/auto';

const props = withDefaults(defineProps<Partial<MainContentProps>>(), {
  keepAlive: false,
  cache: () => []
});
const { keepAlive, cache } = toRefs(props);
</script>

<style scoped>
.main {
  overflow-y: auto;
  height: 100%;
}
</style>

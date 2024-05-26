<template>
  <div
    class="cursor-pointer rounded-md bg-gray-200 p-1 transition-colors duration-300 hover:bg-gray-100"
    @click="onClick"
  >
    <Icon v-if="collapsed" icon="mdi:hamburger-close" :height="size" />
    <Icon v-else icon="mdi:hamburger-open" :height="size" />
  </div>
</template>

<script setup lang="ts" generic="T extends MenuCollapseProps">
import { toRefs } from 'vue';
import { Icon } from '@iconify/vue';

export type MenuCollapseProps = {
  collapsed: boolean;
  size: string | number;
};

export type MenuCollapseEmit = {
  (e: 'update:collapsed', value: boolean): void;
};

const props = withDefaults(defineProps<Partial<MenuCollapseProps>>(), {
  collapsed: false,
  size: 16
});
const emit = defineEmits<MenuCollapseEmit>();

const { collapsed, size } = toRefs(props);

function onClick() {
  emit('update:collapsed', !collapsed.value);
}
</script>

<style scoped></style>

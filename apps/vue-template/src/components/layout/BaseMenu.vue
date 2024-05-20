<template>
  <n-menu
    v-model:expanded-keys="expandedKeys"
    v-bind="attrs"
    :options="treeMenus"
  ></n-menu>
</template>

<script lang="ts">
export interface BaseMenuProps extends /** @vue-ignore */ MenuProps {}
</script>

<script setup lang="ts">
import { toRefs, useAttrs, ref } from 'vue';
import { NMenu, type MenuProps } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { useAppStore } from '../../stores/module/app.store';

const attrs = useAttrs();
const props = withDefaults(defineProps<BaseMenuProps>(), {});
const {} = toRefs(props);

const { treeMenus } = storeToRefs(useAppStore());

// menu data
const expandedKeys = ref<string[]>([]);
</script>

<style scoped></style>

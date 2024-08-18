<template>
  <NTree
    :data="root"
    block-line
    default-expand-all
    :render-suffix="
      ({ option }) =>
        h(Icon, {
          icon: 'mdi:add',
          onclick: () => {
            handleIconClick(option);
          }
        })
    "
  ></NTree>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Icon } from '@iconify/vue';
import { NTree, treeProps, type TreeOption } from 'naive-ui';
import { useTreeData } from '../../hooks/useTreeData/useTreeData';
import { useNTreeExtension } from '../../hooks/useNTreeExtension';

const { root, idMap } = useTreeData();
const { append, getNode } = useNTreeExtension(root);

function handleIconClick(node: TreeOption) {
  append({ title: 'test', key: 'fd45saf4ds56afdf' }, node);
}
</script>

<style scoped></style>

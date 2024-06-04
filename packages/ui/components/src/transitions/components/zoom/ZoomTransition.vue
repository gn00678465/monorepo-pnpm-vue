<template>
  <component
    :is="transitionType(group)"
    name="zoom"
    :style="styles"
    v-bind="{ ...hooks, ...attrs, ...props }"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { useAttrs, type RendererElement } from 'vue';
import { useHooks, transitionType } from '../../utility';
import type { ComponentProps } from '../../types';

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const props = withDefaults(defineProps<ComponentProps>(), {
  delay: 0,
  duration: 300,
  group: false,
  transformOrigin: '',
  mode: 'out-in',
  styles: () => ({
    animationFillMode: 'both',
    animationTimingFunction: 'ease-out'
  }),
  tag: 'span'
});
const emits = defineEmits<{
  'before-enter': [el: RendererElement];
  enter: [el: RendererElement];
  'after-enter': [el: RendererElement];
  'enter-cancelled': [el: RendererElement];
  'before-leave': [el: RendererElement];
  leave: [el: RendererElement];
  'after-leave': [el: RendererElement];
  'leave-cancelled': [el: RendererElement];
}>();

const hooks = useHooks(props, emits);
</script>

<style scoped>
@keyframes zoom-in {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

@keyframes zoom-out {
  from {
    opacity: 1;
  }

  50% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  to {
    opacity: 0;
  }
}

.zoom-enter-active {
  animation-name: zoom-in;
}
.zoom-leave-active {
  animation-name: zoom-out;
}
.zoom-move {
  transition: transform 0.35s ease-out;
}
</style>

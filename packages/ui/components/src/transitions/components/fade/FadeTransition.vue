<template>
  <component
    :is="transitionType(group)"
    name="fade"
    :style="styles"
    v-bind="{ ...hooks, ...attrs, ...props }"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts"></script>

<script setup lang="ts">
import { useAttrs } from 'vue';
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
const emits = defineEmits();

const hooks = useHooks(props, {
  beforeEnter(el) {
    emits('before-enter', el);
  },
  enter(el) {
    emits('enter', el);
  },
  afterEnter(el) {
    emits('after-enter', el);
  },
  enterCancelled(el) {
    emits('enter-cancelled', el);
  },
  beforeLeave(el) {
    emits('before-leave', el);
  },
  leave(el) {
    emits('leave', el);
  },
  afterLeave(el) {
    emits('after-leave', el);
  },
  leaveCancelled(el) {
    emits('leave-cancelled', el);
  }
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fade-enter-active {
  animation-name: fade-in;
}
.fade-leave-active {
  animation-name: fade-out;
}
.fade-move {
  transition: transform 0.35s ease-out;
}
</style>

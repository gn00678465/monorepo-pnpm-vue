<template>
  <div
    class="cube-loading select-none"
    id="loading"
    v-cloak
    :style="{
      '--cube-loading-bg': color
    }"
  >
    <div class="sk-cube-grid">
      <div class="sk-cube sk-cube1"></div>
      <div class="sk-cube sk-cube2"></div>
      <div class="sk-cube sk-cube3"></div>
      <div class="sk-cube sk-cube4"></div>
      <div class="sk-cube sk-cube5"></div>
      <div class="sk-cube sk-cube6"></div>
      <div class="sk-cube sk-cube7"></div>
      <div class="sk-cube sk-cube8"></div>
      <div class="sk-cube sk-cube9"></div>
    </div>
    <div class="title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="description" class="description">
      <slot name="description">{{ description }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
export interface CubeLoadingProps {
  title?: string;
  description?: string;
  color?: string;
}
</script>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = withDefaults(defineProps<CubeLoadingProps>(), {
  color: '#495060'
});

const { description, title } = toRefs(props);
</script>

<style scoped>
.cube-loading {
  display: -webkit-box;
  display: -ms-flexbox;
  display: inline-flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  z-index: 100000;
  -webkit-transition:
    opacity 0.7s,
    transform 1.5s ease;
  transition:
    opacity 0.7s,
    transform 1.5s ease;
  user-select: none;
}

.cube-loading .title {
  color: var(--cube-loading-bg);
  font-weight: bold;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 12px;
  letter-spacing: 0.05em;
  line-height: 1.2;
}

.cube-loading .description {
  color: var(--cube-loading-bg);
  font-size: 16px;
  letter-spacing: 0.02em;
  line-height: 1.5;
}

.cube-loading .sk-cube-grid {
  width: 45px;
  height: 45px;
}

.cube-loading .sk-cube-grid .sk-cube {
  width: 15px;
  height: 15px;
  background-color: var(--cube-loading-bg);
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}

.cube-loading dot {
  position: absolute;
  display: inline-block;
  height: 1em;
  line-height: 1;
  text-align: left;
  overflow: hidden;
  margin-left: 4px;
  margin-top: 6px;
}

.cube-loading dot::before {
  display: block;
  content: '...\A..\A.';
  white-space: pre-wrap;
  animation: dot 1s infinite step-start both;
}

@keyframes dot {
  33% {
    transform: translateY(-2em);
  }

  66% {
    transform: translateY(-1em);
  }
}

.sk-cube-grid .sk-cube1 {
  border-top-left-radius: 4px;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube3 {
  border-top-right-radius: 4px;
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.sk-cube-grid .sk-cube7 {
  border-bottom-left-radius: 4px;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}

.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}

.sk-cube-grid .sk-cube9 {
  border-bottom-right-radius: 4px;
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }

  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }

  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}
</style>

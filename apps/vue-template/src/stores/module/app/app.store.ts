import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app-store', () => {
  const sidebarWidth = ref(240);
  const sidebarCollapsedWidth = ref(64);
  const sidebarCollapse = ref(false);

  return {
    sidebarWidth,
    sidebarCollapsedWidth,
    sidebarCollapse
  };
});

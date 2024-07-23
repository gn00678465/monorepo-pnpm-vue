import type { App } from 'vue';
import {
  type RouterHistory,
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router/auto';
import type { RouteRecordRaw } from 'vue-router/auto';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouterGuard } from './guard';
import { routes } from 'vue-router/auto-routes';

export const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes)
});

/** Setup Vue Router */
export async function setupRouter(app: App) {
  app.use(router);

  createRouterGuard(router);

  await router.isReady();
}

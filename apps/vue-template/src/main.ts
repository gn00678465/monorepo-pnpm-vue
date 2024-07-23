import { createApp } from 'vue';
// import { vRole } from '@pnpm-monorepo/vue-utility';

import '@unocss/reset/tailwind.css';
import './styles/main.css';
import 'uno.css';
import 'trickling/lib/style.css';

import App from './app/App.vue';
import { setupRouter, router } from './router';
import { register } from '@pnpm-monorepo-vue/web-components';
import { Icon } from '@iconify/vue';
// import { enableMocking } from './mocks/index';
import type { UserModule } from './types';
import { Loading, loadInitialConfig } from './utility';
import { useThemeStore } from './stores';

async function setupApp() {
  // register web components
  register(['cube-loading']);

  /** show initial loading */
  const loading = new Loading({ title: '載入中，請稍後...', once: true });
  loading.start();

  // mock data by msw
  // await enableMocking();

  // create vue app
  const app = createApp(App);

  // app.use(vRole, { permissions: ['admin', 'advanced', 'normal'] });

  // install all plugins under `plugins/`
  Object.values(
    import.meta.glob<{ install: UserModule }>('./plugins/*.ts', {
      eager: true
    })
  ).forEach((i) => i?.install({ app, router }));

  await setupRouter(app);

  const themeStore = useThemeStore();

  await loadInitialConfig(themeStore.initializeConfig);

  /** hide initial loading */
  loading.stop();

  const meta = document.createElement('meta');
  meta.name = 'naive-ui-style';
  document.head.appendChild(meta);

  // register component
  app.component('Icon', Icon);

  app.mount('#app');
}

setupApp();

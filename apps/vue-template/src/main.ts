import { createApp } from 'vue';
// import { vRole } from '@pnpm-monorepo/vue-utility';

import '@unocss/reset/tailwind.css';
import './styles/main.css';
import 'uno.css';

import App from './app/App.vue';
import { setupRouter, router } from './router';
// import { enableMocking } from './mocks/index';
import type { UserModule } from './types';

async function setupApp() {
  // mock data by msw
  // await enableMocking();

  const app = createApp(App);

  // app.use(vRole, { permissions: ['admin', 'advanced', 'normal'] });

  // install all plugins under `plugins/`
  Object.values(
    import.meta.glob<{ install: UserModule }>('./plugins/*.ts', {
      eager: true
    })
  ).forEach((i) => i?.install({ app, router }));

  await setupRouter(app);

  app.mount('#app');
}

setupApp();

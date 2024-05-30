import type { Router } from 'vue-router/auto';

export function createProgressGuard(router: Router) {
  router.beforeEach(() => {
    window.$tricklingProgress.start();
  });

  router.afterEach(() => {
    window.$tricklingProgress.done();
  });
}

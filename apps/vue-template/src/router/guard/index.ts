import type { Router } from 'vue-router/auto';
import { createProgressGuard } from './progress';

/**
 * Router guard
 *
 * @param router - Router instance
 */
export function createRouterGuard(router: Router) {
  createProgressGuard(router);
}

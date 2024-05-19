import { createPinia } from 'pinia';
import { createORM } from 'pinia-orm';
import type { UserModule } from '../types';

export const install: UserModule = ({ app }) => {
  /**
   * https://pinia-orm.codedredd.de/guide/getting-started/quick-start
   * Pinia ORM
   */
  const pinia = createPinia().use(createORM());
  app.use(pinia);
};

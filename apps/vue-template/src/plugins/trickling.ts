import { createTrickling, type TricklingInstance } from 'trickling';
import type { UserModule } from '../types';

const tricklingProgress = createTrickling({});

export const install: UserModule = () => {
  window.$tricklingProgress = tricklingProgress;
};

declare global {
  interface Window {
    $tricklingProgress: TricklingInstance;
  }
}

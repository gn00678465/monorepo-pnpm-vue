import type { App } from 'vue';
import type { Router } from 'vue-router/auto';

type Ctx = { app: App; router: Router };

export type UserModule = (ctx: Ctx) => void;

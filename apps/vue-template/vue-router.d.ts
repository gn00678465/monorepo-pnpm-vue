import 'vue-router';

export {};

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean;
    title: string;
    icon: string;
    sort?: number;
    activeMenu?: string;
    hideInMenu?: boolean;
  }
}

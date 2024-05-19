import type { App } from 'vue';

export interface RoleDirectiveOptions {
  permissions?: string[];
}

export const vRole = {
  install: (app: App<Element>, options: RoleDirectiveOptions = {}) => {
    const { permissions = [] } = options;

    const permissionMap = permissions.reduce(
      (obj, curr, idx, array) => {
        obj[curr] = array.slice(idx);

        return obj;
      },
      {} as Record<string, string[]>
    );

    app.directive('role', {
      mounted(el, binding) {
        const { arg, value } = binding;
        const hasRole = !arg || (value && permissionMap[value].includes(arg));

        if (!hasRole) {
          el.parentNode && el.parentNode.removeChild(el);
        }
      }
    });
  }
};

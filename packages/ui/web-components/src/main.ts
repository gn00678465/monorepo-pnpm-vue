import { CubeLoading } from './CubeLoading';

const webComponentsMap = {
  'cube-loading': CubeLoading
};

export function register(keys?: (keyof typeof webComponentsMap)[]) {
  Object.entries(webComponentsMap).forEach(([key, component]) => {
    if (!keys || (Array.isArray(keys) && !keys.length)) {
      customElements.define(key, component);
    }
    if (
      keys &&
      Array.isArray(keys) &&
      keys.length &&
      keys.includes(key as keyof typeof webComponentsMap)
    ) {
      customElements.define(key, component);
    }
  });
}

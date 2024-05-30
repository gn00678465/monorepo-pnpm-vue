export function setupLoading() {
  const loading = document.querySelector('#loading') as HTMLElement;

  const cubeLoading = document.createElement('cube-loading');

  cubeLoading.title = 'Loading...';

  loading?.appendChild(cubeLoading);

  return loading;
}

export function removeLoading(loading?: HTMLElement) {
  return new Promise<void>((resolve, reject) => {
    (loading &&
      setTimeout(() => {
        loading.style.opacity = '0.02';
        setTimeout(() => document.body.removeChild(loading), 600);
        resolve();
      })) ||
      reject();
  });
}

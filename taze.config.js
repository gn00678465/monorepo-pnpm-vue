import { defineConfig } from 'taze';

export default defineConfig({
  // ignore packages from bumping
  exclude: ['webpack'],
  // fetch latest package info from registry without cache
  force: true,
  // write to package.json
  write: true,
  // run `npm install` or `yarn install` right after bumping
  install: true,
  // override with different bumping mode for each package
  packageMode: {
    typescript: 'major',
    unocss: 'ignore',
    // regex starts and ends with '/'
    '/vue/': 'latest'
  },
  // disable checking for "overrides" package.json field
  depFields: {
    overrides: false
  }
});

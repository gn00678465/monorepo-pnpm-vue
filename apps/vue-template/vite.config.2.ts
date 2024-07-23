import { mergeConfig } from 'vite';
import baseConfig from './vite.config';
import configReplace from './build/plugins/config-replace';
import { join } from 'path';
import { merge } from 'lodash-es';

// https://vitejs.dev/config/
export default mergeConfig(baseConfig, {
  plugins: [
    configReplace([
      {
        target: join('dist', 'config.json'),
        replacement: join('build', 'config2.json')
      }
    ])
  ]
});

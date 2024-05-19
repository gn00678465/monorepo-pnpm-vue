export default {
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    '../../eslint.config.mjs'
  ],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
};

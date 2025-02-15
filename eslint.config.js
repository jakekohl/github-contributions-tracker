import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import pluginCypress from 'eslint-plugin-cypress/flat'
import pluginChaiFriendly from 'eslint-plugin-chai-friendly'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/public/**',
      '**/static/**',
      '**/tmp/**',
    ],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  ...pluginCypress.configs.recommended,
  ...pluginChaiFriendly.configs.recommendedFlat,
  skipFormatting,
]

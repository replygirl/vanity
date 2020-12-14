module.exports = {
  extends: ['ktsn-vue', 'plugin:import/typescript'],
  plugins: ['import'],
  rules: {
    'no-duplicate-imports': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object'
        ],
        pathGroups: [
          {
            pattern: '/@/**',
            group: 'internal'
          }
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false
        }
      }
    ],
    'vue/valid-template-root': 'off'
  }
}

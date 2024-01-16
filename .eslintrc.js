module.exports = {
  'env': {
    'es2021': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'indent': [ 'error', 2 ],
    'eqeqeq': ['error', 'smart'],
    // 'linebreak-style': [ 'error', 'unix' ],
    'quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'semi': [ 'error', 'never' ],
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-var': 'error',
    'no-trailing-spaces': 'error',
    'no-useless-catch': 'off',
    'space-before-function-paren': ['error', 'never'],
    '@typescript-eslint/ban-ts-comment': 'off',
    'comma-dangle': ['error', {
      objects: 'always-multiline',
      arrays: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    // 'import/extensions': [
    //   'error',
    //   'ignorePackages',
    //   {
    //     'js': 'never',
    //     'jsx': 'never',
    //     'ts': 'never',
    //     'tsx': 'never',
    //   },
    // ],
  },
  'globals': {
    window: 'readonly',
  },
  'settings': {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.ts'],
      },
    },
  },
}

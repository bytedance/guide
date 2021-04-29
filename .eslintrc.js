module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'babel',
    'react',
    'promise',
    'standard',
    'react-hooks',
    'prettier',
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    // 检查 Hook 的规则
    'react-hooks/rules-of-hooks': 'error',
    // jsx里import的react未被使用则报错
    'react/jsx-uses-react': 'error',
    // jsx里import的组件未被使用则报错
    'react/jsx-uses-vars': 'error',
    // 允许require
    '@typescript-eslint/no-var-requires': 'off',
    // 函数必须有返回值，数组的map、some等除外
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
      },
    ],
    'no-unused-vars': 'off',
    // 已声明的变量未被使用则报错
    '@typescript-eslint/no-unused-vars': 'error',
    // interface定义的接口以I开头，增强可读性
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
    // 不允许有console，error和warn除外
    'no-console': [
      'off',
      {
        allow: ['warn', 'error'],
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    // 驼峰
    camelcase: [
      'error',
      {
        allow: ['^UNSAFE_'],
      },
    ],
  },
};

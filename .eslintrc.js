module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    REACT_APP_ENV: true,
  },
  rules: {
    'no-console': 1,
    'no-unused-expressions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/newline-after-import': 2,
    '@typescript-eslint/consistent-type-imports': 2,
    'no-nested-ternary': 0, // 允许多元表达式
    'no-var': 2, // 禁用var，用let和const代替
    'no-plusplus': 0, // 可以使用++，--
    'prefer-template': 2, // 强制使用模板字符串
    'react/no-array-index-key': 0, // 可以使用index作为key, 但是只能是展示列表的时候使用
    eqeqeq: [2, 'allow-null'], // 使用 === 替代 == allow-null允许null和undefined==
    semi: [2, 'always'], // 语句强制分号结尾
    '@typescript-eslint/no-unused-vars': 0,
    'consistent-return': 0,
    // 'import/newline-after-import': 2,
    // indent: [2, 2, { ignoredNodes: ['ConditionalExpression'] }], // 缩进风格2个空格键
  },
};

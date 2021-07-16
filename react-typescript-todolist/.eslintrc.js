module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  plugins:["react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
    '@typescript-eslint/naming-convention': [0],
    '@typescript-eslint/interface-name-prefix': [0],
    'jsx-a11y/alt-text': [0],
    'import/no-dynamic-require': [0],
    'iterators/generators': [0],
    'no-console': [0],
    'no-empty': [0],
    'global-require': [0],
    '@typescript-eslint/camelcase': [0],
    'arrow-parens': [0],
    'react/button-has-type': [0],
    'lines-between-class-members': [0],
    'no-param-reassign': [0],
    'class-methods-use-this': [0],
    'no-underscore-dangle': [0],
    'react/no-array-index-key': [0],
    'no-use-before-define': [0],
    '@typescript-eslint/no-use-before-define': [0],
    'import/no-extraneous-dependencies': [0],
    'import/no-unresolved': [0],
    'no-unused-expressions': [0],
    'consistent-return': [0],
    '@typescript-eslint/no-unused-vars': [0],
    'constructor-super': [0],
    'no-confusing-arrow': [0],
    '@typescript-eslint/no-object-literal-type-assertion': [0],
    'eslint-comments/no-unlimited-disable': [0],
  },
};
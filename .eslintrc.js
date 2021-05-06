module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "quotes": [0, "single"],	// 禁用引号检查	引号类型 `` "" ''
    "eqeqeq": [2, "allow-null"],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    // "semi": 1,
  }
}

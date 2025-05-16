export default {
  // 单引号
  singleQuote: true,
  // 末尾不需要逗号
  trailingComma: "none",
  // 箭头函数参数括号
  arrowParens: "avoid",
  // 对象大括号间的空格
  bracketSpacing: true,
  // 缩进
  tabWidth: 2,
  // 使用制表符
  useTabs: false,
  // 最大行长
  printWidth: 160,
  // 分号
  semi: true,
  // 对象属性引号
  quoteProps: "as-needed",
  // JSX 单引号
  jsxSingleQuote: false,
  // JSX 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  //
  // 根据文件类型覆盖配置
  overrides: [
    {
      files: "*.md",
      options: {
        printWidth: 80,
        proseWrap: "always",
      },
    },
  ],
};

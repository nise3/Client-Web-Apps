module.exports = {
  // "stories": [
  //   "../stories/**/*.stories.mdx",
  //   "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  // ],
  stories: [
    '../@crema/*.stories.@(js|jsx|ts|tsx)',
    '../@softbd/**/*.stories.@(js|jsx|ts|tsx)',
    '../@softbd/**/**/*.stories.@(js|jsx|ts|tsx)',
    '../@softbd/**/**/**/*.stories.@(js|jsx|ts|tsx)',
    '../@softbd/**/**/**/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};

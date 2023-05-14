module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/preset-create-react-app"],
  features: {
    storyStoreV7: true
  },
  "framework": {
    name: "@storybook/react-webpack5",
    options: {
      fastRefresh: true
    }
  },
  docs: {
    autodocs: true
  }
};
module.exports = {
    stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "storybook-addon-next-router",
        "@storybook/addon-a11y",
    ],
    framework: "@storybook/react",
    typescript: {
        reactDocgen: false
    }
};

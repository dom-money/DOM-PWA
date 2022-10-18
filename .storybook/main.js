module.exports = {
    stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-next-router',
        '@storybook/addon-a11y',
        '@storybook/addon-jest'
    ],
    features: {
      interactionsDebugger: true, // 👈 Enabling playback controls
      postcss: false,
      modernInlineRender: true,
    },
    framework: '@storybook/react',
};

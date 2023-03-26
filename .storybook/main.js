const path = require('node:path')
const { mergeConfig, loadConfigFromFile } = require('vite')
const svgLoader = require('vite-svg-loader')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|ts)', '../src/**/*.story.@(js|ts)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    const { config: userConfig } = await loadConfigFromFile(path.resolve(__dirname, '../vite.config.ts'))

    return mergeConfig(config, {
      ...userConfig,
      plugins: [svgLoader()],
    })
  },
}

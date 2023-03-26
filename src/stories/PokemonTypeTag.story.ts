import type { StoryFn } from '@storybook/vue3'
import PokemonTypeTag, { type PokemonTypeTagProps } from '@/components/PokemonTypeTag.vue'

export default {
  title: 'PokemonTypeTag',
  component: PokemonTypeTag,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/vue/configure/story-layout
    layout: 'fullscreen',
  },
}

const Template: StoryFn<PokemonTypeTagProps> = args => ({
  components: { PokemonTypeTag },
  setup() {
    return { args }
  },
  template: '<pokemon-type-tag v-bind="args" />',
})

export const Default = Template.bind({})

Default.args = {
  type: 'normal',
}

import PokemonSearch, { type PokemonSearchProps } from '@/components/PokemonSearch.vue'
import type { StoryFn } from '@storybook/vue3'

export default {
  title: 'PokemonSearch',
  component: PokemonSearch,
  argTypes: {},
}

const Template: StoryFn<PokemonSearchProps> = args => ({
  components: { PokemonSearch },
  setup() {
    return { args }
  },
  template: `<pokemon-search v-bind="args" />`,
})

export const Default = Template.bind({})

Default.args = {}

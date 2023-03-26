import PokemonTypeTag from '@/components/PokemonTypeTag.vue'
import { PokemonTypes } from '@/model/PokemonTypes'
import type { StoryObj } from '@storybook/vue3'

export default {
  component: PokemonTypeTag,
  render: (args: any) => ({
    components: { PokemonTypeTag },
    setup() {
      return { args }
    },
    template: '<pokemon-type-tag v-bind="args" />',
  }),
  argTypes: {
    // Define arg types here for controls
    type: { control: 'select', options: PokemonTypes, default: 'normal' },
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

type Story = StoryObj<typeof PokemonTypeTag>

export const Default: Story = {
  args: {},
}

import PokemonTypeTag from '@/components/PokemonTypeTag.vue'
import { PokemonTypes } from '@/model/PokemonTypes'
import type { StoryObj } from '@storybook/vue3'
import { ref } from 'vue'

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

export const Selectable: Story = {
  render(args) {
    return {
      components: { PokemonTypeTag },
      setup() {
        const selected = ref(args.selected ?? false)
        const onClick = () => {
          selected.value = !selected.value
        }
        return { args: { type: 'normal', clickable: true, selected: selected.value, click: onClick } }
      },
      template: '<pokemon-type-tag v-bind="args" @click="args.onClick" />',
    }
  },
}

import PokemonTypeTag, { type PokemonTypeTagProps } from '@/components/PokemonTypeTag.vue'
import { PokemonTypes } from '@/model/PokemonTypes'
import type { StoryFn } from '@storybook/vue3'
import { ref } from 'vue'

export default {
  title: 'PokemonTypeTag',
  component: PokemonTypeTag,
  argTypes: {
    // Define arg types here for controls
    type: { control: 'select', options: PokemonTypes, default: 'normal' },
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

export const Selectable: StoryFn<PokemonTypeTagProps> = (args, { updateArgs }) => ({
  components: { PokemonTypeTag },
  setup() {
    return { args }
  },
  data() {
    return {
      isSelected: args.selected,
    }
  },
  methods: {
    onClick() {
      updateArgs({ ...args, selected: !this.isSelected })
    },
  },
  template: '<pokemon-type-tag v-bind="args" :selected="isSelected" @click="onClick" />',
})

Selectable.args = {
  type: 'bug',
  selected: false,
  clickable: true,
}

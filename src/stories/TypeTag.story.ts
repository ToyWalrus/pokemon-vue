import TypeTag, { type TypeTagProps } from '@/components/TypeTag.vue'
import { PokemonTypes } from '@/model/PokemonTypes'
import type { StoryFn } from '@storybook/vue3'

export default {
  title: 'TypeTag',
  component: TypeTag,
  argTypes: {
    // Define arg types here for controls
    type: { control: 'select', options: PokemonTypes, default: 'normal' },
  },
}

const Template: StoryFn<TypeTagProps> = args => ({
  components: { TypeTag },
  setup() {
    return { args }
  },
  template: '<type-tag v-bind="args" />',
})

export const Default = Template.bind({})

Default.args = {
  type: 'normal',
}

export const Selectable: StoryFn<TypeTagProps> = (args, { updateArgs }) => ({
  components: { TypeTag },
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
  template: '<type-tag v-bind="args" :selected="isSelected" @click="onClick" />',
})

Selectable.args = {
  type: 'bug',
  selected: false,
  clickable: true,
}

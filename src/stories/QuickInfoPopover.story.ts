import QuickInfoPopover, { type QuickInfoPopoverProps } from '@/components/QuickInfoPopover.vue'
import type { StoryFn } from '@storybook/vue3'

export default {
  title: 'QuickInfoPopover',
  component: QuickInfoPopover,
  argTypes: {},
}

const Template: StoryFn<QuickInfoPopoverProps> = args => ({
  components: { QuickInfoPopover },
  setup() {
    return { args }
  },
  template: `<quick-info-popover v-bind="args">
  <template v-slot:evolution-chain>
  Evolution Here
  </template>
  </quick-info-popover>`,
})

export const Default = Template.bind({})

Default.args = {
  pokemonName: 'Sudowoodo',
  dexNumber: 185,
  species: 'Imitation Pokemon',
  types: ['rock'],
  flavorText: 'Although it always pretends to be a tree, its composition appears to be closer to a rock than a plant.',
}

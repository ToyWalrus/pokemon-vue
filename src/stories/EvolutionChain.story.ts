import EvolutionChain, { type EvolutionChainProps } from '@/components/EvolutionChain'
import type { StoryFn } from '@storybook/vue3'

export default {
  title: 'EvolutionChain',
  component: EvolutionChain,
  argTypes: {},
}

const Template: StoryFn<EvolutionChainProps> = args => ({
  components: { EvolutionChain },
  setup() {
    return { args }
  },
  template: `<evolution-chain v-bind="args" />`,
})

export const Default = Template.bind({})

Default.args = {
  chainId: 1,
}

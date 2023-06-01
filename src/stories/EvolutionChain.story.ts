import EvolutionChain, { type EvolutionChainProps } from '@/components/EvolutionChain';
import type { StoryFn } from '@storybook/vue3';

export default {
  title: 'EvolutionChain',
  component: EvolutionChain,
  argTypes: {},
};

const Template: StoryFn<EvolutionChainProps> = args => ({
  components: { EvolutionChain },
  setup() {
    return { args };
  },
  template: `<evolution-chain class="w-[576px]" v-bind="args" />`,
});

export const Eevee = Template.bind({});

Eevee.args = {
  chain: 67,
};

export const Squirtle = Template.bind({});

Squirtle.args = {
  chain: 3,
};

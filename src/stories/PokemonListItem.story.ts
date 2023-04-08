import PokemonListItem, { type PokemonListItemProps } from '@/components/PokemonListItem.vue';
import type { StoryFn } from '@storybook/vue3';

export default {
  title: 'PokemonListItem',
  component: PokemonListItem,
  argTypes: {},
};

const Template: StoryFn<PokemonListItemProps> = args => ({
  components: { PokemonListItem },
  setup() {
    return { args };
  },
  template: `<pokemon-list-item v-bind="args" />`,
});

export const Default = Template.bind({});

Default.args = {
  id: 6,
};

export const Compact = Template.bind({});

Compact.args = {
  id: 1,
  compact: true,
};

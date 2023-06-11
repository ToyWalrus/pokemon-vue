import VirtualizedList, { type VirtualizedListProps } from '@/components/VirtualizedList.vue';
import type { StoryFn } from '@storybook/vue3';

export default {
  title: 'VirtualizedList',
  component: VirtualizedList,
  argTypes: {},
};

const Template: StoryFn<VirtualizedListProps> = args => ({
  components: { VirtualizedList },
  setup() {
    return { args };
  },
  template: `
  <virtualized-list style="height: 100vh" v-bind="args" v-slot="slotProps">
    <pre :style="slotProps.style" style="line-height: 1; border-bottom: 1px solid black">{{ slotProps.style }}</pre>
  </virtualized-list>
  `,
});

export const Default = Template.bind({});

Default.args = {
  items: new Array(100).fill(0).map((_, idx) => ({ id: idx.toString() })),
  itemHeight: 100,
};

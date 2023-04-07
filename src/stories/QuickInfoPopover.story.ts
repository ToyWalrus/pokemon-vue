import QuickInfoPopover, { type QuickInfoPopoverProps } from '@/components/QuickInfoPopover.vue';
import type { StoryFn } from '@storybook/vue3';

export default {
  title: 'QuickInfoPopover',
  component: QuickInfoPopover,
  argTypes: {},
};

const Template: StoryFn<QuickInfoPopoverProps> = args => ({
  components: { QuickInfoPopover },
  setup() {
    return { args };
  },
  template: `<quick-info-popover v-bind="args"/>`,
});

export const Default = Template.bind({});

Default.args = {
  id: 130,
};

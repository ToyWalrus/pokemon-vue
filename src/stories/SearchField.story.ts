import SearchField, { type SearchFieldProps } from '@/components/SearchField.vue';
import type { StoryFn } from '@storybook/vue3';

export default {
  title: 'SearchField',
  component: SearchField,
  argTypes: {},
};

const Template: StoryFn<SearchFieldProps> = args => ({
  components: { SearchField },
  setup() {
    return { args };
  },
  methods: {
    onChange: console.log,
  },
  template: `<search-field v-bind="args" @onChange="onChange" />`,
});

export const Default = Template.bind({});

Default.args = {};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
};

export const WithInitialValue = Template.bind({});

WithInitialValue.args = {
  initialValue: 'Gyarados',
};

export const DebouncedCallback = Template.bind({});

DebouncedCallback.args = {
  changeDebounce: 250,
};

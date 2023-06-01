import { useArgs } from '@storybook/client-api';
import { app } from '@storybook/vue3';
import TypeTag from '../src/components/TypeTag.vue';
import Icon from '../src/components/Icon.vue';
import LoadingSpinner from '../src/components/LoadingSpinner.vue';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// https://craigbaldwin.com/blog/updating-args-storybook-vue/
export const decorators = [
  (story, context) => {
    const [_, updateArgs] = useArgs();
    return story({ ...context, updateArgs });
  },
];

app.component('TypeTag', TypeTag);
app.component('LoadingSpinner', LoadingSpinner);
app.component('Icon', Icon);

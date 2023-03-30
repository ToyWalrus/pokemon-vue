import LoadingSpinner, { type LoadingSpinnerProps } from '@/components/LoadingSpinner.vue'
import type { StoryFn } from '@storybook/vue3'

export default {
  title: 'LoadingSpinner',
  component: LoadingSpinner,
  argTypes: {},
}

const Template: StoryFn<LoadingSpinnerProps> = args => ({
  components: { LoadingSpinner },
  setup() {
    return { args }
  },
  template: `<loading-spinner width="50" v-bind="args" />`,
})

export const Default = Template.bind({})

Default.args = {}

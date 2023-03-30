import TagList, { type TagListProps } from '@/components/TagList.vue'
import type { PokemonType } from '@/model/PokemonTypes'
import type { StoryFn } from '@storybook/vue3'

export default {
  title: 'TagList',
  component: TagList,
  argTypes: {},
}

const Template: StoryFn<TagListProps> = args => ({
  components: { TagList },
  setup() {
    return { args, log: (...args: any[]) => console.log(...args) }
  },
  template: `<tag-list @click="log" v-bind="args" />`,
})

export const Default = Template.bind({})

Default.args = {}

export const Selectable: StoryFn<TagListProps> = args => ({
  components: { TagList },
  setup() {
    return { args }
  },
  data() {
    return {
      selectedTags: ['fire', 'ground'],
      disabledTags: [],
    }
  },
  methods: {
    onClick(tagType: PokemonType) {
      if (this.selectedTags.includes(tagType)) {
        this.selectedTags.splice(this.selectedTags.indexOf(tagType), 1)
      } else {
        this.selectedTags.push(tagType)
      }
    },
  },
  template: `<tag-list @click="onClick" :selectable="true" :selectedTags="selectedTags" :disabledTags="disabledTags" v-bind="args" />`,
})

export const Disabled = Template.bind({})

Disabled.args = {
  selectable: true,
  disabledTags: ['fighting', 'electric', 'ice'],
}

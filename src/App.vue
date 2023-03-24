<script setup lang="ts">
import { ref, reactive, computed, onMounted, type VNodeRef, onUnmounted } from 'vue'

const text = ref('Hello world!')
const className = 'header-class'

const count = ref(0)

const view2 = ref(false)
function toggle() {
  view2.value = !view2.value
}

let id = 0
const hideCompleted = ref(false)
const list = reactive([
  { id: id++, value: 'Item 1', completed: false },
  { id: id++, value: 'Item 2', completed: false },
  { id: id++, value: 'Item 3', completed: false },
  { id: id++, value: 'Item 4', completed: false },
])

const filteredList = computed(() => {
  return hideCompleted.value ? list.filter((i) => !i.completed) : list
})

function addToList() {
  list.push({ id: id++, value: `Item ${id}`, completed: false })
}

function removeFromList(id: number) {
  list.splice(
    list.findIndex((i) => i.id === id),
    1
  )
}

const refEl = ref<HTMLElement>()
let intervalVal: number
onMounted(() => {
  let add = true

  const updateHeader = () => {
    const header = refEl.value
    if (header) {
      if (add) {
        header.textContent += '!'
      } else if (header.textContent?.includes('!')) {
        header.textContent = header.textContent.substring(0, header.textContent.lastIndexOf('!'))
      }
      add = !add
    }
  }

  intervalVal = setInterval(updateHeader, 1000)
})

onUnmounted(() => {
  if (typeof intervalVal !== 'undefined') {
    clearInterval(intervalVal)
  }
})
</script>

<template>
  <h1 ref="refEl" :class="className">{{ text }}</h1>
  <div class="button-row">
    <button @click="() => count++">Count: {{ count }}</button>
    <button @click="toggle">Toggle view</button>
  </div>
  <input v-if="view2" v-model="count" type="number" />
  <input v-else v-model="text" />
  <hr style="margin: 12px 0" />
  <ul>
    <li v-for="item in filteredList" :key="item.id">
      <input type="checkbox" v-model="item.completed" />
      <span v-if="item.id < 4">{{ item.value }}</span>
      <span v-else>
        <mark>{{ item.value }}</mark>
        <i>&nbsp;(added)</i>
      </span>
      <button @click="() => removeFromList(item.id)">Remove</button>
    </li>
  </ul>
  <div class="button-row">
    <button @click="addToList">Add new</button>
    <button @click="() => (hideCompleted = !hideCompleted)">{{ hideCompleted ? 'Show all' : 'Hide completed' }}</button>
  </div>
</template>

<style>
.header-class {
  color: cadetblue;
}

ul {
  overflow-y: auto;
  min-height: 100px;
  max-height: 200px;
  box-sizing: border-box;
  border: 1px solid gray;
  padding: 8px;
}

li {
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-bottom: 4px;
}

.button-row {
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin: 8px 0;
}
</style>

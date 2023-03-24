<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  text: String,
})
const emit = defineEmits(['onClickedALot'])

const clickCount = ref(0)
function incrementClickCount() {
  clickCount.value++

  if (clickCount.value > 5) {
    emit('onClickedALot', 'Hey, stop that!')
    clickCount.value = 0
  }
}
</script>

<template>
  <h2>I am a child component!</h2>
  <div @click="incrementClickCount">Prop text: {{ text }}</div>
</template>

<template>
  <div class="flex transition-all duration-200">
    <div
      @click="onClick"
      :class="tagClass"
      class="flex flex-row flex-shrink-0 px-4 py-2 items-center rounded-full gap-2 transition-all duration-200"
    >
      <NormalIcon v-if="props.type === 'normal'" />
      <FireIcon v-else-if="props.type === 'fire'" />
      <WaterIcon v-else-if="props.type === 'water'" />
      <GrassIcon v-else-if="props.type === 'grass'" />
      <ElectricIcon v-else-if="props.type === 'electric'" />
      <IceIcon v-else-if="props.type === 'ice'" />
      <FightingIcon v-else-if="props.type === 'fighting'" />
      <PoisonIcon v-else-if="props.type === 'poison'" />
      <GroundIcon v-else-if="props.type === 'ground'" />
      <FlyingIcon v-else-if="props.type === 'flying'" />
      <PsychicIcon v-else-if="props.type === 'psychic'" />
      <BugIcon v-else-if="props.type === 'bug'" />
      <RockIcon v-else-if="props.type === 'rock'" />
      <GhostIcon v-else-if="props.type === 'ghost'" />
      <DragonIcon v-else-if="props.type === 'dragon'" />
      <DarkIcon v-else-if="props.type === 'dark'" />
      <SteelIcon v-else-if="props.type === 'steel'" />
      <FairyIcon v-else-if="props.type === 'fairy'" />
      <div class="capitalize text-white flex-grow-0 font-bold" v-if="!props.iconOnly">{{ props.type }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NormalIcon from '@/assets/Normal.svg?component'
import FireIcon from '@/assets/Fire.svg?component'
import WaterIcon from '@/assets/Water.svg?component'
import GrassIcon from '@/assets/Grass.svg?component'
import ElectricIcon from '@/assets/Electric.svg?component'
import IceIcon from '@/assets/Ice.svg?component'
import FightingIcon from '@/assets/Fighting.svg?component'
import PoisonIcon from '@/assets/Poison.svg?component'
import GroundIcon from '@/assets/Ground.svg?component'
import FlyingIcon from '@/assets/Flying.svg?component'
import PsychicIcon from '@/assets/Psychic.svg?component'
import BugIcon from '@/assets/Bug.svg?component'
import RockIcon from '@/assets/Rock.svg?component'
import GhostIcon from '@/assets/Ghost.svg?component'
import DragonIcon from '@/assets/Dragon.svg?component'
import DarkIcon from '@/assets/Dark.svg?component'
import SteelIcon from '@/assets/Steel.svg?component'
import FairyIcon from '@/assets/Fairy.svg?component'
import type { PokemonType } from '@/model/PokemonTypes'
import { computed } from 'vue'

export interface PokemonTypeTagProps {
  type: PokemonType
  iconOnly?: boolean
  selected?: boolean
  clickable?: boolean
}

export interface PokemonTypeTagEmits {
  (event: 'click'): void
}

const props = withDefaults(defineProps<PokemonTypeTagProps>(), { type: 'normal' })
const emit = defineEmits<PokemonTypeTagEmits>()

const tagClass = computed(() => {
  let bgValue: string
  switch (props.type) {
    case 'normal':
      bgValue = 'bg-type-normal'
      break
    case 'fire':
      bgValue = 'bg-type-fire'
      break
    case 'water':
      bgValue = 'bg-type-water'
      break
    case 'grass':
      bgValue = 'bg-type-grass'
      break
    case 'electric':
      bgValue = 'bg-type-electric'
      break
    case 'ice':
      bgValue = 'bg-type-ice'
      break
    case 'fighting':
      bgValue = 'bg-type-fighting'
      break
    case 'poison':
      bgValue = 'bg-type-poison'
      break
    case 'ground':
      bgValue = 'bg-type-ground'
      break
    case 'flying':
      bgValue = 'bg-type-flying'
      break
    case 'psychic':
      bgValue = 'bg-type-psychic'
      break
    case 'bug':
      bgValue = 'bg-type-bug'
      break
    case 'rock':
      bgValue = 'bg-type-rock'
      break
    case 'ghost':
      bgValue = 'bg-type-ghost'
      break
    case 'dragon':
      bgValue = 'bg-type-dragon'
      break
    case 'dark':
      bgValue = 'bg-type-dark'
      break
    case 'steel':
      bgValue = 'bg-type-steel'
      break
    case 'fairy':
      bgValue = 'bg-type-fairy'
      break
    default:
      bgValue = ''
      break
  }

  return [
    bgValue,
    {
      'cursor-default': !props.clickable,
      'cursor-pointer hover:-translate-y-px hover:drop-shadow-lg': props.clickable,
      'aspect-square p-3': props.iconOnly,
      'outline outline-offset-2 outline-primary ': props.selected,
    },
  ]
})

function onClick() {
  if (!props.clickable) return
  emit('click')
}
</script>

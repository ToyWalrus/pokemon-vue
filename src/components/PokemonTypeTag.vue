<template>
  <div class="flex">
    <div @click="props.onClick" :class="classValue">
      <NormalIcon v-if="props.type === 'normal'" />
      <FireIcon v-if="props.type === 'fire'" />
      <WaterIcon v-if="props.type === 'water'" />
      <GrassIcon v-if="props.type === 'grass'" />
      <ElectricIcon v-if="props.type === 'electric'" />
      <IceIcon v-if="props.type === 'ice'" />
      <FightingIcon v-if="props.type === 'fighting'" />
      <PoisonIcon v-if="props.type === 'poison'" />
      <GroundIcon v-if="props.type === 'ground'" />
      <FlyingIcon v-if="props.type === 'flying'" />
      <PsychicIcon v-if="props.type === 'psychic'" />
      <BugIcon v-if="props.type === 'bug'" />
      <RockIcon v-if="props.type === 'rock'" />
      <GhostIcon v-if="props.type === 'ghost'" />
      <DragonIcon v-if="props.type === 'dragon'" />
      <DarkIcon v-if="props.type === 'dark'" />
      <SteelIcon v-if="props.type === 'steel'" />
      <FairyIcon v-if="props.type === 'fairy'" />
      <div class="capitalize text-white flex-grow-0 font-bold">{{ props.type }}</div>
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
import clsx from 'clsx'

export interface PokemonTypeTagProps {
  type: PokemonType
  selected?: boolean
  onClick?: () => void
}

const props = defineProps<PokemonTypeTagProps>()
const hasClick = computed(() => typeof props.onClick !== 'undefined')

const bgClass = computed(() => {
  switch (props.type) {
    case 'normal':
      return 'bg-type-normal'
    case 'fire':
      return 'bg-type-fire'
    case 'water':
      return 'bg-type-water'
    case 'grass':
      return 'bg-type-grass'
    case 'electric':
      return 'bg-type-electric'
    case 'ice':
      return 'bg-type-ice'
    case 'fighting':
      return 'bg-type-fighting'
    case 'poison':
      return 'bg-type-poison'
    case 'ground':
      return 'bg-type-ground'
    case 'flying':
      return 'bg-type-flying'
    case 'psychic':
      return 'bg-type-psychic'
    case 'bug':
      return 'bg-type-bug'
    case 'rock':
      return 'bg-type-rock'
    case 'ghost':
      return 'bg-type-ghost'
    case 'dragon':
      return 'bg-type-dragon'
    case 'dark':
      return 'bg-type-dark'
    case 'steel':
      return 'bg-type-steel'
    case 'fairy':
      return 'bg-type-fairy'
    default:
      return ''
  }
})

const classValue = computed(() => {
  return clsx('flex flex-row flex-shrink-0 items-center rounded-full gap-2 px-4 py-2', bgClass.value, {
    'cursor-pointer': hasClick.value,
  })
})
</script>

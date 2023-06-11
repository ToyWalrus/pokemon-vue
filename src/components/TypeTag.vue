<template>
  <div class="flex transition-all duration-200">
    <div
      @click="onClick"
      :class="tagClass"
      class="flex flex-row select-none items-center rounded-full gap-2 transition-all duration-200">
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
      <div class="capitalize flex-grow-0 font-bold" v-if="!props.iconOnly">{{ props.type }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NormalIcon from '@/assets/Normal.svg?component';
import FireIcon from '@/assets/Fire.svg?component';
import WaterIcon from '@/assets/Water.svg?component';
import GrassIcon from '@/assets/Grass.svg?component';
import ElectricIcon from '@/assets/Electric.svg?component';
import IceIcon from '@/assets/Ice.svg?component';
import FightingIcon from '@/assets/Fighting.svg?component';
import PoisonIcon from '@/assets/Poison.svg?component';
import GroundIcon from '@/assets/Ground.svg?component';
import FlyingIcon from '@/assets/Flying.svg?component';
import PsychicIcon from '@/assets/Psychic.svg?component';
import BugIcon from '@/assets/Bug.svg?component';
import RockIcon from '@/assets/Rock.svg?component';
import GhostIcon from '@/assets/Ghost.svg?component';
import DragonIcon from '@/assets/Dragon.svg?component';
import DarkIcon from '@/assets/Dark.svg?component';
import SteelIcon from '@/assets/Steel.svg?component';
import FairyIcon from '@/assets/Fairy.svg?component';
import type { PokemonType } from '@/model/PokemonTypes';
import { computed } from 'vue';

export interface TypeTagProps {
  type: PokemonType;
  iconOnly?: boolean;
  selected?: boolean;
  clickable?: boolean;
  disabled?: boolean;
  fillContainer?: boolean;
  size?: 'S' | 'M' | 'L';
}

const props = withDefaults(defineProps<TypeTagProps>(), { type: 'normal' });
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const tagClass = computed(() => {
  let bgValue: string;
  if (props.disabled) {
    bgValue = 'bg-gray-400';
  } else {
    switch (props.type) {
      case 'normal':
        bgValue = 'bg-type-normal';
        break;
      case 'fire':
        bgValue = 'bg-type-fire';
        break;
      case 'water':
        bgValue = 'bg-type-water';
        break;
      case 'grass':
        bgValue = 'bg-type-grass';
        break;
      case 'electric':
        bgValue = 'bg-type-electric';
        break;
      case 'ice':
        bgValue = 'bg-type-ice';
        break;
      case 'fighting':
        bgValue = 'bg-type-fighting';
        break;
      case 'poison':
        bgValue = 'bg-type-poison';
        break;
      case 'ground':
        bgValue = 'bg-type-ground';
        break;
      case 'flying':
        bgValue = 'bg-type-flying';
        break;
      case 'psychic':
        bgValue = 'bg-type-psychic';
        break;
      case 'bug':
        bgValue = 'bg-type-bug';
        break;
      case 'rock':
        bgValue = 'bg-type-rock';
        break;
      case 'ghost':
        bgValue = 'bg-type-ghost';
        break;
      case 'dragon':
        bgValue = 'bg-type-dragon';
        break;
      case 'dark':
        bgValue = 'bg-type-dark';
        break;
      case 'steel':
        bgValue = 'bg-type-steel';
        break;
      case 'fairy':
        bgValue = 'bg-type-fairy';
        break;
      default:
        bgValue = '';
        break;
    }
  }

  return [
    bgValue,
    props.disabled ? 'text-gray-500 [&>svg>path]:fill-gray-500' : 'text-white',
    {
      'px-4 py-2': !props.size || props.size === 'L',
      'px-2 py-0.5 [&>svg]:scale-75 text-sm': props.size === 'S',
      'px-3 py-1.5 [&>svg]:scale-85 text-sm': props.size === 'M',
      'cursor-default': props.disabled,
      'cursor-pointer hover:-translate-y-px hover:drop-shadow-lg active:translate-y-0':
        props.clickable && !props.disabled,
      'outline-primary outline outline-2 outline-offset-1': props.selected,
      'aspect-square p-3 justify-center': props.iconOnly,
      'flex-1': props.fillContainer,
    },
  ];
});

function onClick(e: MouseEvent) {
  if (props.disabled || !props.clickable) return;
  emit('click', e);
}
</script>

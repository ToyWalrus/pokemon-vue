<script setup lang="ts">
import type { PokemonType } from '@/model/PokemonTypes'

export interface PokemonListItemProps {
  loading?: boolean
  compact?: boolean
  types?: PokemonType[]
  img?: string
  name?: string
  dexNum?: string | number
  species?: string
}

const props = defineProps<PokemonListItemProps>()
</script>

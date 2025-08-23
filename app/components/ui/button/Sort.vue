<script setup lang="ts">
import type { SortingDirection } from '~/types/common/Table'

defineProps<{
	direction: SortingDirection | null
	pending?: boolean
}>()

const emit = defineEmits<{ sort: [SortingDirection] }>()
</script>

<template>
	<div class="sort-buttons">
		<button
			:disabled="pending"
			type="submit"
			title="Сортировать по возрастанию"
			aria-label="Сортировать по возрастанию"
			class="sort-buttons__button"
			:class="{ 'sort-buttons__button_active': direction === 'asc' }"
			@click="emit('sort', 'asc')"
		>
			<Icon
				name="icon:sorting"
				class="sort-buttons__icon"
			/>
		</button>
		<button
			:disabled="pending"
			type="submit"
			title="Сортировать по убыванию"
			aria-label="Сортировать по убыванию"
			class="sort-buttons__button sort-buttons__button_down"
			:class="{ 'sort-buttons__button_active': direction === 'desc' }"
			@click="emit('sort', 'desc')"
		>
			<Icon
				name="icon:sorting"
				class="sort-buttons__icon"
			/>
		</button>
	</div>
</template>

<style scoped lang="scss">
.sort-buttons {
  display: grid;
  gap: 2px;
  &__button{
    color: var(--grey-2);
    transition: color 0.3s ease;
    &:active{
      transform: translate(0px, -1px);
    }
    &_down {
      &:active{
        transform: translate(0px, 1px);
      }
      span{
        transform: rotate(180deg);
      }
    }
    &_active {
      color: var(--green-1);
    }
    @media (any-hover: hover){
       &:hover{
         color: var(--green-1);
       }
    }
    &:disabled{
      pointer-events: none;
    }
  }

  &__icon {
    width: 7px;
    height: 4px;
    display: block;
  }
}
</style>

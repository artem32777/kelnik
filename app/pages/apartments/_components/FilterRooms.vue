<script setup lang="ts">
const store = useApartmentsTableStore()
const { filterRanges, filter } = storeToRefs(store)

const handeClick = (room: number) => {
	if (!filter.value) return
	if (filter.value.rooms.includes(room)) {
		filter.value.rooms = filter.value.rooms.filter(el => el != room)
	} else {
		filter.value.rooms.push(room)
	}
}
</script>

<template>
	<div
		v-if="filterRanges && filter"
		class="filter-rooms"
	>
		<button
			v-for="room in filterRanges.rooms"
			:key="room"
			type="submit"
			class="filter-rooms__button"
			:class="{ 'filter-rooms__button_active': filter.rooms.includes(room) }"
			@click="handeClick(room)"
		>
			{{ `${room}к` }}
		</button>
	</div>
</template>

<style scoped lang="scss">
.filter-rooms {
 display: flex;
 gap: 16px;
  &__button{
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease 0s;
    &:hover{
      box-shadow: 0 6px 20px var(--green-3);
      color: var(--main-black);
    }
    &:active{
      background-color: var(--green-1);
      color: #fff;
    }
    &_active{
      background-color: var(--green-1);
      box-shadow: 0 6px 20px var(--green-3);
      color: #fff;
    }
  }
}
</style>

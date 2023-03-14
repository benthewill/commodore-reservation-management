<script setup>
  import {storeToRefs} from "pinia";
  import {storeAllReservations} from "../store/allReservations";
  import {storeView} from "../store/viewStore";
  const reqAllLanes = async () => {
    return await $fetch('/api/fetchAllLanes').then(x => x)
  }
  const lanesData = await reqAllLanes().then(y => y)

  const {data:reservationData, loading, filteredData, error} = storeToRefs(storeAllReservations())
  const allReservations = storeAllReservations()
  allReservations.fetchData()

  const {amount} = storeToRefs(storeView())
  const viewStore = storeView()


  allReservations.filterByDate(viewStore.selectDate)

  function next () {
    viewStore.incrementAmount()
    allReservations.filterByDate(viewStore.selectDate)
  }

  function prev () {
    viewStore.decrementAmount()
    allReservations.filterByDate(viewStore.selectDate)
  }

</script>

<template>
  <div class="h-[96vh] w-screen bg-slate-200">
    {{viewStore.selectDate}}
    <button @click="prev">Previous Day</button>
    <button @click="next">Next Day</button>
    {{filteredData}}
    {{amount}}
    <div class="grid grid-flow-col auto-cols-auto h-full">
      <res-board-lane-column v-for="lane in lanesData.bowling_lanesCollection.edges"  :lane-num="lane.node.lane_number" :key="lane.node.lane_number">
        <template #content>

          <div class="absolute h-5/6 w-5/6 bg-slate-100"></div>
        </template>
      </res-board-lane-column>
    </div>
  </div>
</template>
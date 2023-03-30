<script setup>
  import {storeToRefs} from "pinia";
  import {storeAllReservations} from "../store/allReservations";
  import {storeView} from "../store/viewStore";
  import timeScaleConversion from "../composables/timeScaleConversion";
  const reqAllLanes = async () => {
    return await $fetch('/api/fetchAllLanes').then(x => x)
  }
  const lanesData = await reqAllLanes().then(y => y)

  const {data:reservationData, loading, filteredData, error} = storeToRefs(storeAllReservations())
  const allReservations = storeAllReservations()
  allReservations.fetchData()

  const {amount} = storeToRefs(storeView())
  const viewStore = storeView()

  const timeScale = (x) => timeScaleConversion(x)

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
    <div class="grid grid-flow-col auto-cols-auto h-full">
      <div class="flex flex-col w-full">
        <div class="flex-none text-center"><p>Hours</p></div>
        <div class=" grow bg-slate-400 ">
          <div class="flex flex-col h-full">
            <div
                v-for="x in [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]"
                class="flex-auto border-[0.5px] border-slate-200/50 bg-white">
              {{x}}

            </div>
          </div>
        </div>
      </div>
      <res-board-lane-column v-for="lane in lanesData.bowling_lanesCollection.edges"  :lane-num="lane.node.lane_number" :key="lane.node.lane_number">
        <template #content>
          <div class="absolute h-full w-full">
            <div v-for="entry in allReservations.filterDataByEntries">
              <div v-if="entry.bowling_lanes.lane_number === lane.node.lane_number" :style="{top: timeScale(entry.entry_time_from) + '%'}" class="absolute inset-x-0">
                <div
                    class="border-y-indigo-500 border-[1px]"
                    :class="[{'border-l-indigo-500 ml-1' : entry.leftMost, 'border-r-0' : entry.leftMost && !entry.rightMost, 'border-r-indigo-500 mr-1' : entry.rightMost, 'border-l-0': entry.rightMost && !entry.leftMost}]"
                    :style="{height:((Number(entry.entry_time_to.replaceAll(':', '')) /100) - (Number(entry.entry_time_from.replaceAll(':', '')) /100)) + 'px'}"
                >
                  <p class="text-xs">ID: {{entry.reservation_id}} Time: {{entry.entry_time_from.substr(0,5)}} to {{entry.entry_time_to.substr(0,5)}}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </res-board-lane-column>
    </div>
  </div>
</template>
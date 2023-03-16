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
<!--    <p class="text-xs">-->
<!--      {{filteredData}}-->
<!--    </p>-->
<!--    <p class="text-xs text-lime-700">-->
<!--      {{allReservations.filterDataByEntries}}-->
<!--    </p>-->
<!--    <p>-->
<!--      Amount: {{amount}}-->
<!--    </p>-->
    <div class="grid grid-flow-col auto-cols-auto h-full">
      <res-board-lane-column v-for="lane in lanesData.bowling_lanesCollection.edges"  :lane-num="lane.node.lane_number" :key="lane.node.lane_number">
        <template #content>
          <div class="absolute h-full w-full">
            <div v-for="entry in allReservations.filterDataByEntries">
              <div v-if="entry.bowling_lanes.lane_number === lane.node.lane_number" class="pb-20">
                <div
                    class="border-y-indigo-500 border-2"
                    :class="{'border-l-indigo-500 ml-1' : entry.leftMost, 'border-r-indigo-500 mr-1' : entry.rightMost}"
                >
                  <p class="text-xs">ID: {{entry.reservation_id}}</p>
                  <p class="text-xs">Time From: {{entry.entry_time_from}}</p>
                  <p class="text-xs">Time To: {{entry.entry_time_to}}</p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </res-board-lane-column>
    </div>
  </div>
</template>
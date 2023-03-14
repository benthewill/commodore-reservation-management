<script setup>
  const props = defineProps(['laneNum','reservationData'])
</script>
<template>
  <div class="flex flex-col w-full">
    <div class="flex-none text-center"><p>Lane #{{laneNum}}</p></div>
    <div class="relative grow bg-slate-400 ">

      <div class="absolute w-full h-full" >
        <slot name="content"></slot>
      </div>
      <div class="flex flex-col h-full">
        <div
            v-for="x in [8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]"
            class="flex-auto border-[0.5px] border-slate-200/50 bg-white">

        </div>
      </div>
    </div>
  </div>
</template>
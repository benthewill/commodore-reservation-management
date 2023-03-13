<script setup>
  import {storeToRefs} from "pinia";
  import {storeAllReservations} from "./store/allReservations";

  const {data, loading, error} = storeToRefs(storeAllReservations())
  const {fetchData} = storeAllReservations()
  fetchData()
</script>

<template>
  <p>Commodore lanes Internal Reservation Management System</p>
  <div v-for="entry in data" style="background-color: aliceblue">
    <pre>{{entry.node}}</pre>
    <br><br>
  </div>
</template>

<style>
</style>
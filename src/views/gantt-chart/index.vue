<template>
  <g-gantt-chart
    chart-start="2021-07-12 12:00"
    chart-end="2021-07-20 12:00"
    precision="day"
    bar-start="myBeginDate"
    bar-end="myEndDate"
  >
    <g-gantt-row label="일정1" :bars="row1BarList" />
    <g-gantt-row label="일정2" :bars="row2BarList" />
  </g-gantt-chart>
</template>

<script setup lang="ts">
import { ref } from "vue";
const row1BarList = ref([
  {
    myBeginDate: "2021-07-13 00:00",
    myEndDate: "2021-07-14 00:00",
    ganttBarConfig: {
      // each bar must have a nested ganttBarConfig object ...
      id: "unique-id-1", // ... and a unique "id" property
      label: "일정관리",
    },
  },
]);
const row2BarList = ref([
  {
    myBeginDate: "2021-07-13 00:00",
    myEndDate: "2021-07-14 02:00",
    ganttBarConfig: {
      id: "another-unique-id-2",
      hasHandles: true,
      label: "일정관리2",
      style: {
        // arbitrary CSS styling for your bar
        background: "#e09b69",
        borderRadius: "20px",
        color: "black",
      },
    },
  },
]);
</script>

<template>
  <draggable
    v-model="gridLists"
    item-key="num"
    animation="300"
    class="grid-container"
    chosen-class="chosen"
  >
    <template #item="{ element }">
      <div class="draggable-item">
        {{ element.num }}
      </div>
    </template>
  </draggable>
  <p>{{ $t("puzzle.rule") }}</p>
  <el-button type="primary" round @click.prevent="openAlert(isCorrect)">{{
    $t("puzzle.submit")
  }}</el-button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import draggable from "vuedraggable";
import { openAlert } from "@/utils/alertMessage";

const isCorrect = computed(() => {
  const lists = gridLists.value; // 한 번만 참조
  return lists.every((item, index) => item.num === index + 1)
    ? "success"
    : "error";
});

const gridLists = ref([
  { num: 8 },
  { num: 5 },
  { num: 4 },
  { num: 6 },
  { num: 9 },
  { num: 1 },
  { num: 2 },
  { num: 3 },
  { num: 7 },
]);
</script>

<style>
.grid-container {
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: auto auto auto;
}
.draggable-item {
  padding: 10px;
  background: lightgray;
  border: 1px solid #ccc;
  margin: 5px;
  cursor: grab;
}
.chosen {
  border: solid 2px #3089dc !important;
}
</style>

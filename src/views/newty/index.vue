<template>
  <div class="inner">
    <div class="star-rating d-flex justify-content-center">
      <div class="star" v-for="index in 5" :key="index" @click="check(index)">
        <span v-if="index < score">🍎</span>
        <span v-if="index >= score">🍏</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const score = ref(0);
const check = (index: number) => {
  score.value = index + 1;
};
</script>

<style scoped></style>

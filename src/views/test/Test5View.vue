<template>
  <TypeIt :options="options" :customActions="customActions" />
</template>

<script setup lang="ts">
import TypeIt from "@/components/Typeit/index.vue";

const options = {
  strings: [`한글${"테스트"}`, "test2", "test3", "default 입니다!😁"],
  speed: 100,
};

// customActions 배열에 메서드를 넣어줌
const customActions = [
  (typeItInstance: any) => typeItInstance.pause(1000),
  (typeItInstance: any) => typeItInstance.delete(null, { delay: 1000 }),
  (typeItInstance: any) => typeItInstance.type("Goodbye!"),
  (typeItInstance: any) => typeItInstance.delete(null, { delay: 1000 }),
  (typeItInstance: any) => typeItInstance.type("Real Goodbye!"),
];
</script>

<style scoped></style>

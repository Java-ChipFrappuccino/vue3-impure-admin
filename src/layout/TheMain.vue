<template>
  <NavBar />
  <TabBar />
  <div class="container py-4">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import TabBar from "@/components/TabBar.vue";
import NavBar from "@/components/NavBar.vue";
</script>

<style scoped></style>

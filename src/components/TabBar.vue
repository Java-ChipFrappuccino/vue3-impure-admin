<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" href="#">Home</a>
    </li>
    <li v-for="(tab, index) in tabs" :key="index" class="nav-item">
      <a class="nav-link" aria-current="page" href="#"
        >{{ tab.title }}
        <span @click.stop="handleDelete()" class="isHover">x</span></a
      >
    </li>
    <!-- <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
    <li class="nav-item">
      <a class="nav-link disabled" aria-disabled="true">Disabled</a>
    </li> -->
  </ul>
</template>

<script setup lang="ts">
import { useTabBarStore } from "@/stores/tabBar";

const { tabs, addTab, deleteTab } = useTabBarStore();
// tabs.push({ title: "test1" });
// tabs.push({ title: "test2" });

function handleDelete() {
  alert("삭제");
}
</script>

<style scoped>
.isHover {
  padding: 2px;
  margin-left: 0.5rem;
  visibility: hidden;
  opacity: 0; /* 투명도 설정 */
  transition: opacity 0.3s ease; /* 부드러운 전환 효과 */
}
.isHover:hover {
  background-color: grey;
}
.nav-item:hover .isHover {
  /* background-color: grey; */
  visibility: visible;
  opacity: 1; /* 투명도 복원 */
}
</style>

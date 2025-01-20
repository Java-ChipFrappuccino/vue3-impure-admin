import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

// 객체의 구조를 정의
type Tab = {
  title: string;
  id?: number;
};
// interface Tab {
//   title: string;
//   id?: number;
// }
export const useTabBarStore = defineStore("tab-bar", () => {
  const tabs = reactive<Tab[]>([]);
  // const doubleCount = computed(() => count.value * 2);
  function addTab(data) {
    tabs.push({ title: data });
  }
  function deleteTab() {
    tabs.splice(data);
  }

  return { tabs, addTab, deleteTab };
});

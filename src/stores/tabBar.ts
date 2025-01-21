import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

// 객체의 구조를 정의
export type Tab = {
  title: string;
  id?: number;
  path: string;
};
// interface Tab {
//   title: string;
//   id?: number;
// }
export const useTabBarStore = defineStore("tab-bar", () => {
  const tabs = reactive<Tab[]>(
    JSON.parse(localStorage.getItem("tabs") || "[]")
  );
  function saveTabsToStorage() {
    localStorage.setItem("tabs", JSON.stringify(tabs));
  }
  // const doubleCount = computed(() => count.value * 2);
  function handleTab(action: string, data: Tab) {
    switch (action) {
      case "push":
        const exist = tabs.some((v) => v.title === data.title);
        if (exist) return console.log("중복");
        tabs.push({ title: data.title, path: data.path });
        saveTabsToStorage(); // 변경 후 저장
        break;
      case "splice":
        const idx = tabs.findIndex((v) => data.title === v.title);
        if (idx == -1) return;
        tabs.splice(idx, 1);
        saveTabsToStorage(); // 변경 후 저장
    }
  }
  // function addTab(data) {
  //   tabs.push({ title: data });
  // }
  // function deleteTab(data: Tab) {
  //   tabs.splice(data);
  // }

  return { tabs, handleTab };
});

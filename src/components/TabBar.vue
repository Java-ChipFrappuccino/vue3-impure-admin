<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <RouterLink
        class="nav-link"
        :class="isActive('/')"
        aria-current="page"
        to="/"
        >{{ $t("menus.home") }}</RouterLink
      >
    </li>
    <TransitionGroup name="tabs">
      <li v-for="tab in tabs" :key="tab.path" class="nav-item">
        <RouterLink
          class="nav-link"
          :class="isActive(tab.path)"
          aria-current="page"
          :to="tab.path"
          >{{ $t(tab.title) }}

          <span @click.prevent="deleteTab('splice', tab)" class="isHover"
            >x</span
          ></RouterLink
        >
      </li>
    </TransitionGroup>
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
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { type Tab } from "@/stores/tabBar";

const { tabs, handleTab } = useTabBarStore();
// function eachTab(tab: Tab): Tab {
//   return { title: tab.title, path: tab.path };
// }
const router = useRouter();
const route = useRoute();
const currentUrl = ref(route.path);

const isActive = (url: string) => {
  // currentUrl.value = route.path;
  return route.path === url ? "active" : "";
};

const deleteTab = (action: string, tab: any) => {
  const idx = tabs.findIndex((v) => v.path === tab.path); // 현재 인덱스를 추출하고
  // 현재 url이랑 삭제요청url이 같지않으면 탭 이동없이 삭제
  if (tab.path !== route.path) {
    handleTab(action, tab);
    // 현재 url이랑 삭제요청url이 같으면서 첫번째 탭이면 홈으로 이동
  } else if (idx == 0) {
    router.push("/");
    handleTab(action, tab);
    // 현재 url이랑 삭제요청url이 같으면 현재 인덱스 -1 의 url로 이동
  } else router.push(tabs[idx - 1].path);
  handleTab(action, tab);
};
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

.tabs-enter-active,
.tabs-leave-active {
  transition: opacity 0.2s ease;
}

.tabs-enter-to,
.tabs-leave-from {
  opacity: 1;
}

.tabs-enter-from,
.tabs-leave-to {
  opacity: 0;
}
</style>

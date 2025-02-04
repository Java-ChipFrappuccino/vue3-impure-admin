<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/">{{
              $t("navBar.home")
            }}</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/map"
              @click="
                handleTab('push', {
                  title:
                    'map' /* 저장할때는 각 번역파일에서 공통으로 사용하는 키값으로 저장 */,
                  path: '/map',
                })
              "
              >{{ $t("navBar.map") }}</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/puzzle"
              @click="handleTab('push', { title: 'puzzle', path: '/puzzle' })"
              >{{ $t("navBar.puzzle") }}</RouterLink
            >
          </li>

          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/gantt-chart"
              @click="
                handleTab('push', {
                  title: 'ganttChart',
                  path: '/gantt-chart',
                })
              "
              >{{ $t("navBar.ganttChart") }}</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/test4"
              @click="handleTab('push', { title: 'test4', path: '/test4' })"
              >{{ $t("navBar.test4") }}</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink
              class="nav-link"
              to="/test5"
              @click="handleTab('push', { title: 'test5', path: '/test5' })"
              >{{ $t("navBar.test5") }}</RouterLink
            >
          </li>

          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </ul>
      </div>
      <i class="bi bi-gear-fill" @click="drawer = true"></i>
      <el-drawer
        :style="themeToggle ? 'background-color: rgb(20, 20, 20);' : ''"
        v-model="drawer"
        title="I am the title"
        :with-header="false"
      >
        <i style="font-size: 2rem" class="bi bi-translate"></i>
        <div class="flex flex-wrap gap-4 items-center">
          <el-select
            @change="changeLanguage(currentLang)"
            v-model="currentLang"
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="d-flex align-items-center">
          <i style="font-size: 2rem" class="bi bi-brightness-low"></i>
          <el-switch @change="changeTheme" v-model="themeToggle" />
          <i style="font-size: 1.4rem" class="bi bi-moon ms-1"></i>
        </div>
      </el-drawer>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useTabBarStore } from "@/stores/tabBar";
import { setLang, currentLang } from "@/locales/index";
import { ref } from "vue";
const { handleTab } = useTabBarStore();
const drawer = ref(false);
// const value = ref(currentLang); // 현재 설정값을 넣어서 셀렉트에 현재 언어값이 나옴

const options = [
  {
    value: "ko",
    label: "한국어",
  },
  {
    value: "ja",
    label: "日本語",
  },
  {
    value: "en",
    label: "English",
  },
  {
    value: "fr",
    label: "Français",
  },
];

const changeLanguage = (lang) => {
  setLang(lang); // 언어 변경
};

const themeToggle = ref(false);
const changeTheme = () => {
  if (themeToggle.value) {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
  } else {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
  }
};
</script>

<style scoped>
.bi-gear-fill:hover {
  cursor: pointer;
}
</style>

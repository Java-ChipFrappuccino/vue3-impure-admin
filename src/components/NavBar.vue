<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <div class="icon-container">
        <i class="bi bi-person-circle"></i>
        <el-dropdown trigger="click" placement="bottom-end">
          <span style="font-size: 16px; color: black">
            <el-badge
              :value="unReadNotification === 0 ? '' : unReadNotification"
              :max="99"
            >
              <span class="header-notice-icon">
                <!-- 알림 아이콘 -->
                <i class="bi bi-bell-fill"></i>
              </span>
            </el-badge>
          </span>
          <template #dropdown>
            <el-empty
              v-if="unReadNotification === 0"
              style="width: 200px"
              description="알림 없음"
              :image-size="100"
            />
            <el-dropdown-menu v-else style="width: 200px">
              <div
                @click.prevent="markAllAsRead"
                class="dropdown-item-all-read"
              >
                모두읽음
              </div>
              <router-link
                v-for="noti in unReadNotification"
                :key="noti"
                :to="'/test4#' + noti"
                @click.prevent="decreaseUnReadNotification"
                style="text-decoration: none; display: block"
              >
                <el-dropdown-item divided> 알림 {{ noti }} </el-dropdown-item>
              </router-link>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- <i class="bi bi-bell-slash-fill"></i> -->
        <i class="bi bi-gear-fill" @click="drawer = true"></i>
      </div>
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
          <li class="nav-item" v-for="menu in wholeMenus" :key="menu.path">
            <RouterLink
              class="nav-link"
              aria-current="page"
              :to="menu.path"
              @click="
                handleTab('push', {
                  title: menu.meta.title as string,
                  path: menu.path,
                })
              "
              >{{ $t(menu.meta.title as string) }}</RouterLink
            >
          </li>
          <!-- <li class="nav-item">
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

          <a class="nav-link disabled" aria-disabled="true">Disabled</a> -->
        </ul>
      </div>

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
import { useNotificationStore } from "@/stores/notification";
import { setLang, currentLang } from "@/locales/index";
import { ref, reactive } from "vue";
import router from "@/router";
import { storeToRefs } from "pinia";
import { getUnReadNotifications } from "@/api/notifications";

const store = useNotificationStore();
const wholeMenus = reactive(router.getRoutes().splice(1)); // 첫번째는 홈이라서 제외
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
const { resetUnReadNotification, decreaseUnReadNotification } = store;
const { unReadNotification } = storeToRefs(store);
const updateNotification = async () => {
  // 비동기적으로 읽지 않은 알림 목록을 가져옴
  const unreadPosts = await getUnReadNotifications();

  // 읽지 않은 게시글의 갯수를 unReadNotification에 할당
  unReadNotification.value = unreadPosts.length;
};

// 호출 시 updateNotification을 실행하여 갯수를 업데이트
updateNotification();
const markAllAsRead = () => {
  resetUnReadNotification();
};
</script>

<style scoped>
.bi-gear-fill:hover {
  cursor: pointer;
}
.icon-container {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 20px;
  i {
    display: flex;
    align-items: center;

    margin-left: 8px;
  }
}
.dropdown-item-all-read {
  cursor: pointer;
  padding: 4px;
  text-align: center;
  /* background-color: #f5f5f5; */
  color: #9e9fa3;
  font-weight: bold;
}
</style>

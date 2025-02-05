import { createRouter, createWebHistory } from "vue-router";
import NProgress from "@/utils/nprogress/index.ts";
import HomeView from "../views/HomeView.vue";
import MapView from "@/views/test/MapView.vue";
import GanttChart from "@/views/gantt-chart/index.vue";
import Puzzle from "@/views/puzzle/index.vue";
import Test4View from "@/views/test/Test4View.vue";
import Test5View from "@/views/test/Test5View.vue";
// import { i18n } from "@/locales/index"; // i18n 설정 가져오기
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: {
        title: "menus.home",
      },
    },
    {
      path: "/map",
      name: "Map",
      component: MapView,
      meta: {
        title: "menus.map",
      },
    },
    {
      path: "/puzzle",
      name: "Puzzle",
      component: Puzzle,
      meta: {
        title: "menus.puzzle",
      },
    },
    {
      path: "/gantt-chart",
      name: "GanttChart",
      component: GanttChart,
      meta: {
        title: "menus.ganttChart",
      },
    },
    {
      path: "/test4",
      name: "test4",
      component: Test4View,
      meta: {
        title: "menus.test4",
      },
    },
    {
      path: "/test5",
      name: "test5",
      component: Test5View,
      meta: {
        title: "menus.test5",
      },
    },
    {
      path: "/newty",
      name: "Newty",
      component: () => import("@/views/newty/index.vue"),
      meta: {
        title: "menus.newty",
      },
    },
  ],
});

// 라우터 로딩 시 NProgress 사용
router.beforeEach((to, from, next) => {
  NProgress.start(); // 로딩 시작
  next();
});

router.afterEach(() => {
  NProgress.done(); // 로딩 완료
});

export default router;

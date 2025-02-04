import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MapView from "@/views/test/MapView.vue";
import GanttChart from "@/views/gantt-chart/index.vue";
import Puzzle from "@/views/puzzle/index.vue";
import Test4View from "@/views/test/Test4View.vue";
import Test5View from "@/views/test/Test5View.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/map",
      name: "Map",
      component: MapView,
      meta: {
        title: {
          en: "Map",
          ko: "지도",
        },
      },
    },
    {
      path: "/puzzle",
      name: "Puzzle",
      component: Puzzle,
    },
    {
      path: "/gantt-chart",
      name: "GanttChart",
      component: GanttChart,
    },
    {
      path: "/test4",
      name: "test4",
      component: Test4View,
    },
    {
      path: "/test5",
      name: "test5",
      component: Test5View,
    },
  ],
});

export default router;

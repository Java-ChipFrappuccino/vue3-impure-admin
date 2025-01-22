import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MapView from "@/views/test/MapView.vue";
import Test2View from "@/views/test/Test2View.vue";
import Test3View from "@/views/test/Test3View.vue";
import Test4View from "@/views/test/Test4View.vue";
import Test5View from "@/views/test/Test5View.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
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
      path: "/test2",
      name: "test2",
      component: Test2View,
    },
    {
      path: "/test3",
      name: "test3",
      component: Test3View,
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

import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import ganttastic from "@infectoone/vue-ganttastic";

// 전역 css
import "./assets/main.css";
// 부트스트랩
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; //이것만 추가하면 됨 , 위에것의 압축버전 , 똑같은거 2개 추가했더니 충돌나서 네비바 토글 오류났음 ㅡㅡ
import "bootstrap-icons/font/bootstrap-icons.css";

import ElementPlus from "element-plus";
import ko from "element-plus/es/locale/lang/ko";

import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import { i18n } from "@/locales/index"; // i18n 설정 가져오기

const app = createApp(App);

app.use(ElementPlus, {
  locale: ko,
});
app.use(i18n);
app.use(ganttastic);
app.use(createPinia());
app.use(router);
// app.use(ElementPlus);

app.mount("#app");

import { ref } from "vue";
import { createI18n } from "vue-i18n";
import { ko, en, ja, fr } from "./lang/index";

const currentLang = ref("ko");
const lang = currentLang.value;
const i18n = createI18n({
  locale: lang, // 기본 언어
  fallbackLocale: "en", // 대체 언어
  messages: {
    en,
    ko,
    ja,
    fr,
  },
});

// 언어 변경 함수
const setLang = (lang) => {
  currentLang.value = lang;
  i18n.global.locale = lang;
};

export { currentLang, setLang, i18n };

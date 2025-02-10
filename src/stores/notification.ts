import { ref } from "vue";
import { defineStore } from "pinia";

// 객체의 구조를 정의
// export type Tab = {
//   title: string;
//   id?: number;
//   path: string;
// };

export const useNotificationStore = defineStore("notification", () => {
  const unReadNotification = ref(0);

  const increaseUnReadNotification = () => {
    unReadNotification.value++;
  };
  const decreaseUnReadNotification = () => {
    if (unReadNotification.value === 0) return;
    unReadNotification.value--;
  };
  const resetUnReadNotification = () => {
    unReadNotification.value = 0;
  };

  return {
    unReadNotification,
    increaseUnReadNotification,
    decreaseUnReadNotification,
    resetUnReadNotification,
  };
});

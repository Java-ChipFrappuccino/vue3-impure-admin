import { ref } from "vue";
import { defineStore } from "pinia";

// 객체의 구조를 정의
// export type Tab = {
//   title: string;
//   id?: number;
//   path: string;
// };

export const useNotificationStore = defineStore("notification", () => {
  const unReadNotificationPost = ref([]);
  const unReadNotification = ref(unReadNotificationPost.value.length); // 읽지 않은 알림 수

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
    unReadNotificationPost,
    increaseUnReadNotification,
    decreaseUnReadNotification,
    resetUnReadNotification,
  };
});

<template>
  <!-- 타이핑 애니메이션을 표시할 div -->
  <div ref="typeItElement"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import TypeIt from "typeit";

const typeItElement = ref(null); // TypeIt에 사용할 DOM 요소
// const options = {
//   strings: ["한글", "test2", "test3"],
//   speed: 100,
// };
const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  customActions: {
    type: Array,
    default: () => [],
    // 기본값은 빈 배열, 함수형으로 선언한 이유는
    // default: []로 선언하면 이 모듈을 사용하는 모든 컴포넌트에서 같은 배열을 참조하게 되어 문제가 발생할 수 있음
    // 그래서 함수형으로 선언하여 각 컴포넌트에서 독립적인 배열을 참조하도록 함
  },
});

// options 객체와 customActions(동적 동작)으로 초기화
onMounted(() => {
  if (typeItElement.value) {
    const typeItInstance = new TypeIt(typeItElement.value, props.options);

    // customActions가 있다면 순차적으로 메서드 적용
    props.customActions.forEach((action) => {
      if (typeof action === "function") {
        action(typeItInstance);
      }
    });

    typeItInstance.go();
  }
});

onBeforeUnmount(() => {
  // 컴포넌트가 언마운트되기 전에 필요하면 종료처리
  // TypeIt에서 특별한 종료 메서드가 없으므로 이 예시에서는 필요하지 않지만, 다른 라이브러리에서 종료 메서드가 있을 수 있음
});
</script>

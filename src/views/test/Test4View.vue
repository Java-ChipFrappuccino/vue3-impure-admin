<template>
  <el-button :plain="true" @click="addNotification">notification</el-button>
</template>

<script lang="ts" setup>
import { useNotificationStore } from "@/stores/notification";

const { unReadNotification } = useNotificationStore();

function addNotification() {
  unReadNotification.value += 1;
}
</script>

<template>
  <el-button :plain="true" @click="addPost">notification +</el-button>
  <el-button :plain="true" @click="decreaseUnReadNotification"
    >notification -</el-button
  >
  <el-card
    v-for="post in posts"
    :key="post.id"
    :id="post.id"
    style="max-width: 480px; margin-top: 30px"
    shadow="never"
  >
    <template #header>
      <div class="card-header">
        <span>{{ post.title }}</span>
      </div>
    </template>
    <p>{{ post.content }}</p>
    <template #footer>Footer content</template>
  </el-card>
  <el-button class="tt">tt</el-button>
</template>

<script lang="ts" setup>
import { useNotificationStore } from "@/stores/notification";
import { createPost, getAllPosts } from "@/api/posts.ts";
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { ElNotification } from "element-plus";
const store = useNotificationStore();
const posts = reactive([]);

const getPostList = async () => {
  const data = await getAllPosts();
  posts.splice(0, posts.length, ...data); // 기존 배열 초기화 후 새 데이터 추가
};
getPostList();
const addPost = async () => {
  const newPost = await createPost((num.value += 1)); // 새 포스트 생성
  posts.unshift(newPost); // 새 포스트를 배열 맨 앞에 추가
  unReadNotificationPost.value.push(newPost); // 읽지 않은 알림에도 추가
  increaseUnReadNotification();
  const config = { title: newPost.title, message: newPost.content };
  addNoti(config);
};

const num = ref(0);
const { increaseUnReadNotification, decreaseUnReadNotification } =
  useNotificationStore();
const { unReadNotificationPost } = storeToRefs(store);

const addNoti = (config) => {
  ElNotification({ ...config, position: "bottom-right", duration: 2000 });
};
</script>

<style scoped>
.tt {
  background-color: black;
  height: 200px;
  color: white;
  border-radius: 100%;
}
</style>

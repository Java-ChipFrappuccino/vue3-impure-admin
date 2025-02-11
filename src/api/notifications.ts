const url = import.meta.env.VITE_DB_BASE_URL;

import { getAllPosts, updatePost } from "@/api/posts.ts";

export const getUnReadNotifications = async () => {
  const allPosts = await getAllPosts();
  // 읽지 않은 게시물만 필터링
  return allPosts.filter((post) => !post.isRead);
};

export const readNotification = async (id) => {
  await updatePost(id);
};

export const readAllNotifications = async () => {
  const unReadPosts = await getUnReadNotifications();

  for (const post of unReadPosts) {
    await updatePost(post.id);
  }
};
